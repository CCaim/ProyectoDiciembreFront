import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor(private _http: HttpClient) { }

  cargarImagen(datos:any){
    return fetch('https://api.cloudinary.com/v1_1/de411te3t/image/upload',{method:'POST', body:datos});
  }
}
