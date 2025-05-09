import { Component, OnInit } from '@angular/core';
import { CloudinaryService } from '../../service/cloudinary.service';
import { NgForm } from '@angular/forms';
import { Genero } from '../../service/genero.service';
import { LibroService, Libro } from '../../service/libro.service';
import { GeneroService } from '../../service/genero.service';
import { Usuario, UsuarioService } from '../../service/usuario.service';
import { TokenService } from '../../service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  imagenes: File[] = [];
  libroNew: Libro = {};
  generoAll: Genero[] = [];
  generoSeleccionados: Genero[] = [];
  generoID: number = 0;
  generoVacio: boolean = false;
  imagenSubida: boolean = false;

  constructor(
    private _cloudinaryService: CloudinaryService,
    private _tokenService: TokenService,
    private _router: Router,
    private _generoService: GeneroService,
    private _usuService: UsuarioService,
    private _libroService: LibroService
  ) {}

  ngOnInit(): void {
    // Cargar la lista de géneros desde la base de datos
    this._generoService.getGeneros().subscribe(
      (respuesta: Genero[]) => {
        this.generoAll = respuesta;
      }
    );

    // Obtener el usuario actual para asociarlo al libro
    const username = this._tokenService.getUserName();
    this._usuService.getUsuarioByUsername(username!).subscribe(
      (respuesta: Usuario) => {
        this.libroNew.usuario = respuesta;
        console.log(this.libroNew);
      }
    );
  }

  onSelect(event: any): void {
    console.log(event);
    this.imagenes.push(...event.addedFiles);
  }

  onRemove(event: any): void {
    console.log(event);
    this.imagenes.splice(this.imagenes.indexOf(event), 1);
  }

  subirImagen(): void {
    if (this.imagenes.length > 0) {
      const data = new FormData();
      data.append('file', this.imagenes[0]);
      data.append('upload_preset', 'angular_CasaLibro');
      data.append('cloud_name', 'de411te3t');

      this._cloudinaryService.cargarImagen(data)
        .then((response) => response.json())
        .then((data) => {
          this.libroNew.urlImagen = data.secure_url;
          this.imagenSubida = true;
          console.log('URL de la imagen subida:', data.secure_url);
        })
        .catch((error) => {
          console.error('Error al subir la imagen:', error);
          alert('Hubo un error al subir la imagen. Intente nuevamente.');
        });
    } else {
      alert('Seleccione primero la imagen que desea subir.');
    }
  }

  agregarGenero(form: NgForm): void {
    if (form.valid) {
      this._generoService.getGenero(this.generoID).subscribe(
        (respuesta: Genero) => {
          if (!this.generoSeleccionados.some(g => g.id === respuesta.id)) {
            this.generoSeleccionados.push(respuesta);
            console.log('Género añadido:', respuesta);
          } else {
            alert('El género ya está añadido.');
          }
        }
      );
      this.generoVacio = false;
    } else {
      this.generoVacio = true;
      alert('Seleccione un género válido para añadir.');
    }
  }

  eliminarGenero(genero: Genero): void {
    this.generoSeleccionados = this.generoSeleccionados.filter(g => g.id !== genero.id);
    console.log('Género eliminado:', genero);
  }

  goBack(): void {
    this._router.navigateByUrl('../');
  }

  guardarLibro(form: NgForm): void {
    if (form.valid && this.generoSeleccionados.length > 0 && this.imagenSubida) {
      this.libroNew.genero = this.generoSeleccionados;
      this._libroService.createLibro(this.libroNew).subscribe(
        () => {
          console.log('Libro creado con éxito');
          this._router.navigate(['/home']);
        },
        (error) => {
          console.error('Error al guardar el libro:', error);
          alert('Hubo un error al guardar el libro. Intente nuevamente.');
        }
      );
    } else {
      alert('Complete todos los campos, añada al menos un género y suba una imagen antes de guardar.');
    }
  }
}