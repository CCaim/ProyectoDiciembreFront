import { Injectable } from '@angular/core';
import { Usuario } from './usuario.service';
import { Genero } from './genero.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from './comentario.service';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  
  private apiLibroUrl = 'http://localhost:8095/libro';

  constructor(private _http: HttpClient) { }

  getLibros():Observable<Libro[]>{
    return this._http.get<Libro[]>(`${this.apiLibroUrl}/getAll`);
  }

  getLibro(id: number):Observable<Libro>{
    return this._http.get<Libro>(`${this.apiLibroUrl}/${id}`);
  }

  createLibro(nuevaLibro: Libro):Observable<Libro>{
    return this._http.post<Libro>(`${this.apiLibroUrl}/new`, nuevaLibro);
  }

  removeLibro(id:number):Observable<void>{
    return this._http.delete<void>(`${this.apiLibroUrl}/remove/${id}`);
  }

  putLibro(id:number, updatedLibro:Libro):Observable<Libro>{
    return this._http.put<Libro>(`${this.apiLibroUrl}/update/${id}`, updatedLibro);
  }

  buscarLibros(busqueda:string, librosAct:Libro[]):Usuario[]{
    let librosAux: Libro[]=[];
    busqueda = busqueda.toLowerCase();
    for(let i = 0; i < librosAct.length; i++) {
      let libro = librosAct[i];
      let nombre = libro.nombre!.toLowerCase();
      if (nombre.indexOf(busqueda) >= 0) {
        librosAux.push(libro);
      }
    }
    return librosAux;
  }

}

export interface Libro{
  id?:number,
  nombre?:string,
  instrucciones?:string,
  tipo?:string,
  valoracion?:number,
  urlImagen?:string,
  comentarios?:Comentario[],
  usuario?:Usuario,
  generos?:GeneroConCantidad[]
}

export interface GeneroConCantidad {
  id?:number,
  genero?: Genero;
  cantidad?:number,
  nombre?: string
}