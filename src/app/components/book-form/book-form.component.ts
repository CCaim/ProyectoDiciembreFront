import { Component, OnInit } from '@angular/core';
import { CloudinaryService } from '../../service/cloudinary.service';
import { NgForm } from '@angular/forms';

import { Usuario, UsuarioService } from '../../service/usuario.service';
import { TokenService } from '../../service/token.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-book-form',
  imports: [],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit{
  
  imagenes: File[]=[];
  recetaNew: Receta = {};
  ingreAll: Ingrediente[]=[];
  ingreConCantidadArray: IngredienteConCantidad[]=[];
  ingreID:number=0;
  ingreCantidad:number=0;
  ingreMedida:string="";
  ingreVacio:boolean=false;
  imagenSubida:boolean=false;

  constructor(private _cloudinaryService:CloudinaryService, private _tokenService:TokenService, private _router:Router,
  private _ingreService: IngredienteService, private _usuService: UsuarioService, private _receService: RecetaService){
  }

  ngOnInit(): void {
    this._ingreService.getIngredientes().subscribe(
      (respuesta: Ingrediente[]) => {
        this.ingreAll = respuesta;
      }
    );
    let username = this._tokenService.getUserName();
    this._usuService.getUsuarioByUsername(username!).subscribe(
      (respuesta: Usuario) => {
        this.recetaNew.usuario = respuesta;
        console.log(this.recetaNew);
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
          this.recetaNew.urlImagen = data.secure_url;
          this.imagenSubida=true;
          console.log(data.secure_url)
        });
    }else{
      alert('Seleccione primero la imagen que desea subir');
    }
  }

  nuevoIngreConCantidad(form: NgForm) {
    if (form.valid) {
      let ingreConCantidadNew: IngredienteConCantidad = {};
      ingreConCantidadNew.unidadMedida=this.ingreMedida;
      ingreConCantidadNew.cantidad=this.ingreCantidad;
      this._ingreService.getIngrediente(this.ingreID).subscribe(
        (respuesta: Ingrediente) => {
          ingreConCantidadNew.ingrediente = respuesta;
          ingreConCantidadNew.nombre = respuesta.nombre;
        }
      );
      console.log(ingreConCantidadNew)
      this.ingreConCantidadArray.push(ingreConCantidadNew);
      console.log(this.ingreConCantidadArray)
      this.ingreVacio=false;
    }else{
      this.ingreVacio=true;
    }
  }

  eliminarIngreConCantidad(event:any) {
    this.ingreConCantidadArray.splice(this.ingreConCantidadArray.indexOf(event), 1);
  }

  goBack(): void {
    this._router.navigateByUrl('../');
  } 
  
  guardarReceta(form: NgForm){
    if (form.valid && this.ingreConCantidadArray.length > 0 && this.imagenSubida) {
      this.recetaNew.ingredientes = this.ingreConCantidadArray;
      this._receService.createReceta(this.recetaNew).subscribe();
      this._router.navigate(['/home']);
    }else{

    }
  }
}
