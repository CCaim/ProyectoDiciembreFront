import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private apiGeneroUrl = 'http://localhost:8095/genero';


  constructor(private _http: HttpClient) { }

  getGeneros():Observable<Genero[]>{
    return this._http.get<Genero[]>(`${this.apiGeneroUrl}/getAll`);
  }

  getGenero(id: number):Observable<Genero>{
    return this._http.get<Genero>(`${this.apiGeneroUrl}/${id}`);
  }

  createGenero(nuevoGenero: Genero):Observable<Genero>{
    return this._http.post<Genero>(`${this.apiGeneroUrl}/new`, nuevoGenero);
  }

  removeGenero(id:number):Observable<void>{
    return this._http.delete<void>(`${this.apiGeneroUrl}/remove/${id}`);
  }

  putGenero(id:number, updatedGenero:Genero):Observable<Genero>{
    return this._http.put<Genero>(`${this.apiGeneroUrl}/update/${id}`, updatedGenero);
  }

}

export interface Genero{
  id?:number,
  nombre?:string,
  tipo?: string,
}