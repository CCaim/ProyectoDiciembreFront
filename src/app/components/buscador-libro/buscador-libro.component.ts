import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Libro, LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-buscador-libro',
  templateUrl: './buscador-libro.component.html',
  styleUrls: ['./buscador-libro.component.css']
})
export class BuscadorLibroComponent implements OnInit {

  libros:Libro[] = [];
  termino:string|undefined;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
    private _libroService:LibroService){
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params =>{
      this._libroService.getLibros().subscribe(
        (respuesta)=>{
          this.libros= this._libroService.buscarLibros(params['busqueda'], respuesta);
          this.termino = params['busqueda']
        });
    });
  }

  verLibro(i:number){
    this._router.navigate(['/libro',i]);
  }

}
