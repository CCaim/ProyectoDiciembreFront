import { Injectable } from "@angular/core";
import {Usuario} from './usuario.service';
import {Libro} from './libro.service';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {Comentario} from './comentario.service';

@Injectable({
    providedIn: 'root'
})
export class AutorService{
    private apiAutorUrl = 'http://localhost:8095/autor';

    constructor(private _http: HttpClient) {}

    getAutores():Observable<Autor[]> {

        return this._http.get<Autor[]>(`${this.apiAutorUrl}/getAll`);
    }

    getAutores(id: number):Observable<Autor[]> {

        return this._http.get<Autor[]>(`${this.apiAutorUrl}/${id}`);
    }

    createAutor(nuevoAutor: Autor):Observable<Autor>{
        return this._http.post<Autor>(`${this.apiAutorUrl}/new`, nuevoAutor);
    }

    removeAutor(id:number):Observable<void>{
        return this._http.delete<void>(`${this.apiAutorUrl}/remove/${id}`)
    }

    putAutor(id:number, updateAutor:Autor):Observable<Autor>{
        return this._http.delete<void>(`${this.apiAutorUrl}/update/${id}`, updateAutor)
    }

    buscarAutores(busqueda:string, AutoresAct:Autor[]):Usuario[]{
        let AutoresAux: Autor[]=[];
        busqueda = busqueda.toLowerCase();
        for(let i = 0; i < AutoresAct.length; i++) {
          let Autor = AutoresAct[i];
          let nombre = Autor.nombre!.toLowerCase();
          if (nombre.indexOf(busqueda) >= 0) {
            AutoresAux.push(Autor);
          }
        }
        return AutoresAux;
      }

}

export interface Autor{
    id?:number,
    nombre?:string,
    duracion?:number,
    fecha?:string,
    instrucciones?:string,
    origen?:string,
    tipo?:string,
    valoracion?:number,
    dificultad?:string,
    urlImagen?:string,
    comentarios?:Comentario[],
    usuario?:Usuario,
    libros?:LibroConCantidad[]
  }

  export interface LibroConCantidad {
    id?:number,
    libro?: Libro;
    cantidad?:number,
    unidadMedida?:string,
    nombre?: string
  }