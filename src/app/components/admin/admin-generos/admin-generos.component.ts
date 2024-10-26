import { Component } from '@angular/core';
import { Genero, GeneroService } from '../../../service/genero.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-generos',
  templateUrl: './admin-generos.component.html',
  styleUrls: ['./admin-generos.component.css']
})
export class AdminGenerosComponent {

  generos: Genero[] = []
  generoNew: Genero ={

  };

  generoAEditar: Genero = {};

  constructor(private _generoService:GeneroService){

  }

  ngOnInit(): void {
    this.actualizarTabla();
    
  }

  actualizarTabla(){
    this._generoService.getGeneros().subscribe(
      (response)=>{
        this.generos = response;
      }
    );
  }

  buscarGeneroAEditar(id:number){
    let generoEditar = this.generos.find(objeto => objeto.id === id);
    if(generoEditar){
      this.generoAEditar = generoEditar;
    }
  }

  saveGenero(form: NgForm){
    if(form.valid){
      console.log(this.generoNew);
      this._generoService.createGenero(this.generoNew).subscribe(
        (response)=>{
          console.log(response);
          window.location.reload();
        }
      );
    } else{
      console.log('Fallo en save Genero');
    }
  }

  editarGenero(form: NgForm){
    if(form.valid){
      console.log(this.generoAEditar);
      this._generoService.putGenero(this.generoAEditar.id!, this.generoAEditar).subscribe(
        (response)=>{
          console.log(response);
          window.location.reload();
        }
      );
    } else {
      console.log('error en editar genero');
    }
  }

  eliminarGenero(id: number){
    this._generoService.removeGenero(id).subscribe(
      (response)=>{
        console.log(response);
        this.actualizarTabla();
      }
    )
  }
}
