import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private apiComentarioUrl = 'http://localhost:8095/comentario';

  constructor(private _http: HttpClient) { }

  getComentarios():Observable<Comentario[]>{
    return this._http.get<Comentario[]>(`${this.apiComentarioUrl}/getAll`);
  }

  getComentario(id: number):Observable<Comentario>{
    return this._http.get<Comentario>(`${this.apiComentarioUrl}/${id}`);
  }

  createComentario(nuevaComentario: ComentarioDTO):Observable<ComentarioDTO>{
    return this._http.post<ComentarioDTO>(`${this.apiComentarioUrl}/new`, nuevaComentario);
  }

  removeComentario(id:number):Observable<void>{
    return this._http.delete<void>(`${this.apiComentarioUrl}/remove/${id}`);
  }
}

export interface Comentario{
  id?:number,
  mensaje:string,
  usuario: Usuario
}

export interface ComentarioDTO{
  id?:number,
  mensaje?:string,
  idReceta?: number;
  username?: string;
}
