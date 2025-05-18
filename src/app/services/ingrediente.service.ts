import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  private apiIngredienteUrl = 'http://localhost:8095/ingrediente';

  constructor(private _http: HttpClient) { }

  getIngredientes():Observable<Ingrediente[]>{
    return this._http.get<Ingrediente[]>(`${this.apiIngredienteUrl}/getAll`);
  }

  getIngrediente(id: number):Observable<Ingrediente>{
    return this._http.get<Ingrediente>(`${this.apiIngredienteUrl}/${id}`);
  }

  createIngrediente(nuevoIngrediente: Ingrediente):Observable<Ingrediente>{
    return this._http.post<Ingrediente>(`${this.apiIngredienteUrl}/new`, nuevoIngrediente);
  }

  removeIngrediente(id:number):Observable<void>{
    return this._http.delete<void>(`${this.apiIngredienteUrl}/remove/${id}`);
  }

  putIngrediente(id:number, updatedIngrediente:Ingrediente):Observable<Ingrediente>{
    return this._http.put<Ingrediente>(`${this.apiIngredienteUrl}/update/${id}`, updatedIngrediente);
  }
}

export interface Ingrediente{
  id?:number,
  nombre?:string,
  tipo?: string,
  gluten?: boolean
}
