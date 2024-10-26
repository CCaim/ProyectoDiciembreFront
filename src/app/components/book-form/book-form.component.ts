import { Component, OnInit } from '@angular/core';
import { CloudinaryService } from '../../service/cloudinary.service';
import { NgForm } from '@angular/forms';

import { Usuario, UsuarioService } from '../../service/usuario.service';
import { TokenService } from '../../service/token.service';
import { Router } from '@angular/router';
import { Libro, LibroService } from '../../service/libro.service';
import { Genero, GeneroService } from '../../service/genero.service';
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit{
  
  imagenes: File[]=[];
  libroNew: Libro = {};
  generoAll: Genero[]=[];
  ingreID:number=0;
  ingreVacio:boolean=false;
  imagenSubida:boolean=false;

  constructor(private _cloudinaryService:CloudinaryService, private _tokenService:TokenService, private _router:Router,
  private _generoService: GeneroService, private _usuService: UsuarioService, private _libService: LibroService){
  }

  ngOnInit(): void {
    this._generoService.getGeneros().subscribe(
      (respuesta: Genero[]) => {
        this.generoAll = respuesta;
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
      data.append('upload_preset', 'angular_CasaLibro');
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


  goBack(): void {
    this._router.navigateByUrl('../');
  } 
  
  guardarLibro(form: NgForm){
    if (form.valid && this.imagenSubida) {
      this.libroNew.genero;
      this._libService.createLibro(this.libroNew).subscribe();
      this._router.navigate(['/home']);
    }else{

    }
  }
}
