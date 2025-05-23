import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { TokenService } from 'src/app/services/token.service';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Libro, LibroService } from 'src/app/services/libro.service';
import { Genero, GeneroService } from 'src/app/services/genero.service';
@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent {
  
  imagenes: File[]=[];
  libroEdit: Libro = {};
  id:number=0;
  generoAll: Genero[]=[];
  ingreID:number=0;
  ingreVacio:boolean=false;
  imagenSubida:boolean=false;

  constructor(private _cloudinaryService:CloudinaryService, private _tokenService:TokenService, private _activatedRoute:ActivatedRoute, private _router:Router, private _http:HttpClient,
  private _generoService: GeneroService, private _libService: LibroService){
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params =>{
      this.id = params['id']
    });

    this._libService.getLibro(this.id).subscribe(
      (respuesta: Libro) => {
        this.libroEdit = respuesta;
        this.comprobacionUsuario(respuesta.usuario?.username!);
        this.downloadImageAsFile(this.libroEdit.urlImagen!).subscribe(file => {
          this.imagenes.push(file);
        });
      }
    );

    this._generoService.getGeneros().subscribe(
      (respuesta: Genero[]) => {
        this.generoAll = respuesta;
      }
    );
    
  }

  comprobacionUsuario(usernameLibro:string){
    let roles = this._tokenService.getAuthorities();
    let usernameToken = this._tokenService.getUserName();
    let isAdmin:boolean = false;
    let mismo:boolean = false;
    roles.forEach( rol => {
      if(rol === "ROLE_ADMIN"){
        isAdmin=true;
      }
    });
    if(usernameLibro === usernameToken)
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
      data.append('upload_preset', 'angular_libritos');
      data.append('cloud_name', 'de411te3t');
      this._cloudinaryService.cargarImagen(data)
      .then(response => response.json())
      .then(data => {
          this.libroEdit.urlImagen = data.secure_url;
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

      this._libService.putLibro(this.id, this.libroEdit).subscribe(
        (response)=>{
          console.log(response);
          this._router.navigate(['/home']);
        }
      );
      
    }else{
      alert('Complete todos los campos que algo esta fallando');
    }
  }
}
