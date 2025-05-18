import { Component, OnInit } from '@angular/core';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { NgForm } from '@angular/forms';
import { GeneroConCantidad, Libro,LibroService } from 'src/app/services/libro.service';
import { Genero, GeneroService } from 'src/app/services/genero.service';
import { Usuario, UsuarioService } from 'src/app/services/usuario.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-libro-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  imagenes: File[]=[];
  libroNew: Libro = {};
  geneAll: Genero[]=[];
  geneID:number=0;
  geneCantidad:number=0;
  geneVacio:boolean=false;
  imagenSubida:boolean=false;
  geneConCantidadArray: GeneroConCantidad[]=[];

  constructor(private _cloudinaryService:CloudinaryService, private _tokenService:TokenService, private _router:Router,
  private _geneService: GeneroService, private _usuService: UsuarioService, private _libService: LibroService){
  }

  ngOnInit(): void {
    this._geneService.getGeneros().subscribe(
      (respuesta: Genero[]) => {
        this.geneAll = respuesta;
      }
    );
    let username = this._tokenService.getUserName();
    this._usuService.getUsuarioByUsername(username!).subscribe(
      (respuesta: Usuario) => {
        this.libroNew.usuario = respuesta;
        console.log(this.libroNew);
      }
    );
  }

  onSelect(event:any) {
    console.log(event);
    this.imagenes.push(...event.addedFiles);
  }
  
  onRemove(event:any) {
    console.log(event);
    this.imagenes.splice(this.imagenes.indexOf(event), 1);
  }

  subirImagen() {
    if(this.imagenes[0]){
      const data = new FormData();
      data.append('file', this.imagenes[0]);
      data.append('upload_preset', 'angular_espatula');
      data.append('cloud_name', 'de411te3t');
      this._cloudinaryService.cargarImagen(data)
      .then(response => response.json())
      .then(data => {
          this.libroNew.urlImagen = data.secure_url;
          this.imagenSubida=true;
          console.log(data.secure_url)
        });
    }else{
      alert('Seleccione primero la imagen que desea subir');
    }
  }

  nuevoGeneConCantidad(form: NgForm) {
    if (form.valid) {
      let geneConCantidadNew: GeneroConCantidad = {};
      this._geneService.getGenero(this.geneID).subscribe(
        (respuesta: Genero) => {
          geneConCantidadNew.genero = respuesta;
          geneConCantidadNew.nombre = respuesta.nombre;
        }
      );
      console.log(geneConCantidadNew)
      this.geneConCantidadArray.push(geneConCantidadNew);
      console.log(this.geneConCantidadArray)
      this.geneVacio=false;
    }else{
      this.geneVacio=true;
    }
  }

  eliminarGeneConCantidad(event:any) {
    this.geneConCantidadArray.splice(this.geneConCantidadArray.indexOf(event), 1);
  }

  goBack(): void {
    this._router.navigateByUrl('../');
  } 
  
  guardarLibro(form: NgForm){
    if (form.valid && this.geneConCantidadArray.length > 0 && this.imagenSubida) {
      this.libroNew.generos = this.geneConCantidadArray;
      this._libService.createLibro(this.libroNew).subscribe();
      this._router.navigate(['/home']);
    }else{

    }
  }
}
