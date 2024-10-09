import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Libro, LibroService } from '../../service/libro.service';

@Component({
  selector: 'app-book-searcher',
  templateUrl: './book-searcher.component.html',
  styleUrl: './book-searcher.component.css'
})
export class BookSearcherComponent implements OnInit{
  libros:Libro[] = [];
  termino:string|undefined;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
    private _receService:LibroService){
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params =>{
      this._receService.getLibros().subscribe(
        (respuesta)=>{
          this.libros= this._receService.buscarLibros(params['busqueda'], respuesta);
          this.termino = params['busqueda']
        });
    });
  }

  verLibro(i:number){
    this._router.navigate(['/Libro',i]);
  }
}
