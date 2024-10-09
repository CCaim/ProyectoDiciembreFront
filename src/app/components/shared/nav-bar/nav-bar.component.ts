import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibroService } from '../../../service/libro.service';
import { TokenService } from '../../../service/token.service';
import { Libro } from '../../../service/libro.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  body = document.getElementsByTagName("body")[0];
  isLogged = false;
  roles: string[]=[];
  isAdmin: boolean=false;
  username:string|null ="";

  constructor(private _router: Router, private _tokenService: TokenService, private _libService: LibroService){}

  ngOnInit() {
    if (this._tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.roles = this._tokenService.getAuthorities();
    this.roles.forEach( rol => {
      if(rol === "ROLE_ADMIN"){
        this.isAdmin=true;
      }
    });
    this.username=this._tokenService.getUserName();
  }

  cambiarTema() {
      this.body.classList.toggle("claro");
      this.body.classList.toggle("oscuro");
  }

  aparece(id:string) {
    let desple = document.getElementById(id);
    if (desple != null){
      if(desple.style.display==="flex"){
          desple.style.display="none"
      }else{
          desple.style.display="flex";
      }
    }
  }

  buscarLibro(busqueda:string){
    this._router.navigate(['/search',busqueda]);
  }

  libRamdom(){
    let maxRec:number;
    this._libService.getLibros().subscribe(
      (respuesta: Libro[]) => {
        maxRec = respuesta.length;
        let numR:number = Math.round(Math.random()*(maxRec-1)+1);
        this._router.navigate(['/lib', numR]);
      }
    );
  }

  crearLibro(){
    this._router.navigate(['/newLibro']);
  }

  onLogOut(): void {
    this._tokenService.logOut();
    window.location.reload();
  }
}
