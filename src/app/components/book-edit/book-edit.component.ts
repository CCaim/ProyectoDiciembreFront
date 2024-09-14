import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { Ingrediente, IngredienteService } from 'src/app/services/ingrediente.service';
import { IngredienteConCantidad, Receta, RecetaService } from 'src/app/services/receta.service';
import { TokenService } from 'src/app/services/token.service';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent {
  
  imagenes: File[]=[];
  recetaEdit: Receta = {};
  id:number=0;
  ingreAll: Ingrediente[]=[];
  ingreConCantidadArray: IngredienteConCantidad[]=[];
  ingreID:number=0;
  ingreCantidad:number=0;
  ingreMedida:string="";
  ingreVacio:boolean=false;
  imagenSubida:boolean=false;

  constructor(private _cloudinaryService:CloudinaryService, private _tokenService:TokenService, private _activatedRoute:ActivatedRoute, private _router:Router, private _http:HttpClient,
  private _ingreService: IngredienteService, private _receService: RecetaService){
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params =>{
      this.id = params['id']
    });

    this._receService.getReceta(this.id).subscribe(
      (respuesta: Receta) => {
        this.recetaEdit = respuesta;
        this.comprobacionUsuario(respuesta.usuario?.username!);
        this.ingreConCantidadArray = respuesta.ingredientes!;
        this.downloadImageAsFile(this.recetaEdit.urlImagen!).subscribe(file => {
          this.imagenes.push(file);
        });
      }
    );

    this._ingreService.getIngredientes().subscribe(
      (respuesta: Ingrediente[]) => {
        this.ingreAll = respuesta;
      }
    );
    
  }

  comprobacionUsuario(usernameReceta:string){
    let roles = this._tokenService.getAuthorities();
    let usernameToken = this._tokenService.getUserName();
    let isAdmin:boolean = false;
    let mismo:boolean = false;
    roles.forEach( rol => {
      if(rol === "ROLE_ADMIN"){
        isAdmin=true;
      }
    });
    if(usernameReceta === usernameToken)
      mismo=true;
    if(!isAdmin && !mismo){
      this._router.navigate(['/home']);
    }
    
  };

  downloadImageAsFile(imageUrl: string): Observable<File> {
    return this._http.get(imageUrl, { responseType: 'blob' }).pipe(
      map(response => {
        const fileName = this.getFileNameFromUrl(imageUrl);
        return new File([response], fileName);
      })
    );
  }
  
  getFileNameFromUrl(url: string): string {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
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
          this.recetaEdit.urlImagen = data.secure_url;
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
      this.recetaEdit.ingredientes = this.ingreConCantidadArray;
      this._receService.putReceta(this.id, this.recetaEdit).subscribe(
        (response)=>{
          console.log(response);
          this._router.navigate(['/home']);
        }
      );
      
    }else{

    }
  }
}
