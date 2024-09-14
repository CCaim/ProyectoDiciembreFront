import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Libro, LibroService } from 'src/app/service/libro.service';


@Component({
  selector: 'app-admin-libros',
  standalone: true,
  imports: [],
  templateUrl: './admin-libros.component.html',
  styleUrl: './admin-libros.component.css'
})
export class AdminLibrosComponent {
  libros: Libro[] = []
  libroNew: Libro = {
    privado: false
  };
  libroAEditar:Libro={};

  costructor(private _libService:LibroService){

  }
  ngOnInit(): void {
    this.actualizarTabla();
  }

  actualizarTabla(){
    this._libService.getAlgo().subscribe(
      (response)=>{
        this.libros=response;
      }
    );
  }

  buscarLibroAEditar(id:number){
    let libroEditar = this.libro.find(objeto => objeto.id === id);
    if(libroEditar){
      this.libroAEditar = libroEditar;
    }
  }
  saveLibro(form:NgForm){
    if (formatCurrency.valid){
      console.log(this.libroNew);
      this._libService.createLibro(this.libroNew).subscribe(
        (response)=> {
          console.log(response);
          window.location.reload();
        }
      );
    }else{
      console.log('problema');
    }
  
  }
  editarLibro(form: NgForm){
    if (form.valid) {
      console.log(this.libroAEditar);
      this._libService.putLibro(this.libroAEditar.id!, this.libroAEditar).subscribe(
        (response)=>{
          console.log(response);
          window.location.reload();
        }
      );
    }else{
      console.log('problemitas')
    }
  }
  eliminarLibro(id:number){
    this._libService.removeLibro(id).subscribe(
      (response)=>{
        console.log(response);
        this.actualizarTabla();
      }
    );
  }
}
