import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Rol,  Usuario, UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit {

  usuarios:Usuario[]=[]
  usuarioAEditar:Usuario ={};
  rolesAll: Rol[]=[];
  rolesUsuarioArray: Rol[]=[];
  rolID:number=0;

  constructor(private _usuService:UsuarioService){
  }

  ngOnInit(): void {
    this.actualizarTabla();
    this._usuService.getRoles().subscribe(
      (respuesta: Rol[]) => {
        this.rolesAll = respuesta;
        console.log(this.rolesAll);
      }
    );
  }

  actualizarTabla(){
    this._usuService.getUsuarios().subscribe(
      (response)=>{
        this.usuarios=response;
      }
    );
  }

  buscarUsuarioAEditar(id:number){
    let usuarioEditar = this.usuarios.find(objeto => objeto.id === id);
    if(usuarioEditar){
      this.usuarioAEditar=usuarioEditar;
      this.rolesUsuarioArray = this.usuarioAEditar.roles!;
    }
  }

  eliminarRol(event:any){
    this.rolesUsuarioArray.splice(this.rolesUsuarioArray.indexOf(event),1);
  }

  nuevoRol(form: NgForm){
    if (form.valid) {
      console.log(this.rolID);
      console.log(this.rolesAll)
      let rolEditar = this.rolesAll.find(objeto => objeto.id == this.rolID);
      console.log(rolEditar)
      let rolAAñadir!: Rol;
      if(rolEditar){
        rolAAñadir=rolEditar;
        console.log(rolAAñadir);
      }
      console.log(this.rolesUsuarioArray.some(rol => rol.nombre === rolAAñadir.nombre));
      if(!this.rolesUsuarioArray.some(rol => rol.id === rolAAñadir.id)){
        this.rolesUsuarioArray.push(rolAAñadir);
      }
      console.log(this.rolesUsuarioArray);
    }
  }

  editarUsuario(form: NgForm){
    if (form.valid && this.rolesUsuarioArray.length > 0) {
      this.usuarioAEditar.roles = this.rolesUsuarioArray;
      console.log(this.usuarioAEditar);
      this._usuService.putUsuario(this.usuarioAEditar.id!, this.usuarioAEditar).subscribe(
        (response)=>{
          console.log(response);
          window.location.reload();
        }
      );
      
    }else{

    }
  }

  eliminarUsuario(id:number){
    this._usuService.removeUsuario(id).subscribe(
      (response)=>{
        console.log(response);
        this.actualizarTabla();
      }
    );

  }
}
