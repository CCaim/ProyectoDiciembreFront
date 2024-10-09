import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genero } from './genero.service';
import { Comentario } from './comentario.service';
import { Usuario } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  
  private apiLibroUrl = 'http://localhost:8095/libro';

  constructor(private _http: HttpClient) { }

  getLibros(): Observable<Libro[]> {
    return this._http.get<Libro[]>(`${this.apiLibroUrl}/getAll`);
  }

  getLibro(id: number): Observable<Libro> {
    return this._http.get<Libro>(`${this.apiLibroUrl}/${id}`);
  }

  createLibro(nuevoLibro: Libro): Observable<Libro> {
    return this._http.post<Libro>(`${this.apiLibroUrl}/new`, nuevoLibro);
  }

  removeLibro(id: number): Observable<void> {
    return this._http.delete<void>(`${this.apiLibroUrl}/remove/${id}`);
  }

  putLibro(id: number, updatedLibro: Libro): Observable<Libro> {
    return this._http.put<Libro>(`${this.apiLibroUrl}/update/${id}`, updatedLibro);
  }

  buscarLibros(busqueda: string, librosAct: Libro[]): Libro[] {
    let librosAux: Libro[] = [];
    busqueda = busqueda.toLowerCase();
    for (let libro of librosAct) {
      let nombre = libro.nombre!.toLowerCase();
      if (nombre.indexOf(busqueda) >= 0) {
        librosAux.push(libro);
      }
    }
    return librosAux;
  }

  // tieneCalificacionAlta(libro: Libro, umbral: number): boolean {
  //   return libro.valoracion >= umbral;
  // }
}

export interface Libro {
  id?: number;
  nombre?: string; 
  valoracion?: number; 
  fecha?: Date; 
  tipo?: string;
  urlImagen?: string;
  comentarios?: Comentario[];
  usuario?: Usuario;
  texto?: string;
  genero?: Genero[];
}
