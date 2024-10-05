import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from './autor.service';
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
    for (let i = 0; i < librosAct.length; i++) {
      let libro = librosAct[i];
      let titulo = libro.titulo!.toLowerCase();
      if (titulo.indexOf(busqueda) >= 0) {
        librosAux.push(libro);
      }
    }
    return librosAux;
  }

  tieneCalificacionAlta(libro: Libro, umbral: number): boolean {
    return libro.calificacion! >= umbral;
  }
}

export interface Libro {
  id?: number;
  titulo?: string;
  autor?: Autor;
  fechaPublicacion?: string;
  genero?: string;
  descripcion?: string;
  calificacion?: number;
  urlImagen?: string;
  comentarios?: Comentario[];
  usuario?: Usuario;
  
}

