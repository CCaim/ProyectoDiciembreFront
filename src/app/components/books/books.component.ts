import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibroService, Libro } from '../../service/libro.service';

@Component({
  selector: 'app-books',
  imports: [],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {

  libros:Libro[]=[];
  pagina!:number;

  constructor(private _libService:LibroService, private _router:Router){}

  ngOnInit(){
    this.getLibros();
  }

  public getLibros():void{
    this._libService.getLibros().subscribe(
      (respuesta: Libro[]) => {
        this.libros = respuesta;
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );
  }

  verLibro(i:number){
    this._router.navigate(['/libro',i]);
  }
}
