import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LibroService } from 'src/app/services/libro.service';
import { Libro } from 'src/app/services/libro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-libros',
  templateUrl: './admin-libros.component.html',
  styleUrls: ['./admin-libros.component.css'] // Corregido a 'styleUrls'
})
export class AdminLibrosComponent {

  libros: Libro[] = [];
 
  constructor(private _libroService:LibroService, private _router: Router){

  }
  
  ngOnInit(): void {
    this.actualizarTabla();
  }

  actualizarTabla(){
    this._libroService.getLibros().subscribe(
      (response)=>{
        this.libros= response;
      }
    );
  }

  verLibro(id:number){
  this._router.navigate(['/libro', id]);

  }

  libroAEditar(id:number){
    this._router.navigate(['/editLibro', id]);
  }

  eliminarLibro(id: number){
    this._libroService.removeLibro(id).subscribe(
      (response)=>{
        console.log(response);
        this.actualizarTabla();
      }
    );
  }

}
