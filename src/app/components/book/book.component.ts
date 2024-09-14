import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComentarioDTO, ComentarioService } from '../../service/comentario.service';
import { Libro, LibroService } from '../../service/libro.service';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-book',
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{
  

  libro: Libro = {};
  newComen: ComentarioDTO = {};
  mensajeNuevo:string="";
  roles: string[]=[];
  pasosFixed: string[]=[];
  isLogged = false;
  isAdmin: boolean = false;
  isCreadorLibro: boolean = false;
  isCreadorComentario: boolean = false;
  selectedUp: boolean = false;
  selectedDown: boolean = false;
  isGluten:boolean=false;

  constructor(private _tokenService: TokenService, private _activatedRoute: ActivatedRoute, private _router: Router,
    private _libService:LibroService, private _comenService:ComentarioService){}

  ngOnInit(){
    this._activatedRoute.params.subscribe(params =>{
      this._libService.getLibro(params['id']).subscribe(
        (respuesta)=>{
          this.libro = respuesta;
          this.pasosFixed = this.libro.instrucciones!.split(".");
          this.isGluten = this._libService.tieneGluten(this.libro!);
          console.log(this.isGluten);
          if(this._tokenService.getUserName()===respuesta.usuario?.username)
            this.isCreadorLibro=true;
          console.log(respuesta);
          console.log(this.isCreadorLibro);
          console.log(this.pasosFixed);
        });
    });
    
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

  }

  upvote(){
    console.log('suma');
    if(this.selectedDown){
      this.selectedUp=true;
      this.selectedDown=false;
      this.libro.valoracion=this.libro.valoracion!+2;
      this._libService.putlibro(this.libro.id!, this.libro).subscribe(
        (response)=>{
          console.log(response);
        }
      );
    }else{
      this.selectedUp=true;
      this.libro.valoracion!++;
      this._libService.putlibro(this.libro.id!, this.libro).subscribe(
        (response)=>{
          console.log(response);
        }
      );
    }
  }

  downvote(){
    console.log('resta');
    if(this.selectedUp){
      this.selectedUp=false;
      this.selectedDown=true;
      this.libro.valoracion=this.libro.valoracion!-2;
      this._libService.putlibro(this.libro.id!, this.libro).subscribe(
        (response)=>{
          console.log(response);
        }
      );
    }else{
      this.selectedDown=true;
      this.libro.valoracion!--;
      this._libService.putlibro(this.libro.id!, this.libro).subscribe(
        (response)=>{
          console.log(response);
        }
      );
    }
  }

  libroAEditar(id:number){
    this._router.navigate(['/editlibro', id]);
  }

  eliminarlibro(id:number){
    this._libService.removelibro(id).subscribe(
      (response)=>{
        console.log(response);
        this._router.navigate(['/home']);
      }
    );
  }

  addComentario(){
    if(this.mensajeNuevo){
      this.newComen.mensaje = this.mensajeNuevo;
      this.newComen.idlibro = this.libro.id;
      this.newComen.username = this._tokenService.getUserName()!;
      console.log(this.newComen);
      
      this._comenService.createComentario(this.newComen).subscribe(
        (response)=>{
          console.log(response);
          window.location.reload();
        }
      );
    }
  }

  checkAuthor(usernameCreador:string): boolean{
    let usuLogged = this._tokenService.getUserName();
    if(usuLogged === usernameCreador || this.isAdmin){
      return true;
    }else{
      return false;
    }
  }

  eliminarComentario(id:number){
    this._comenService.removeComentario(id).subscribe(
      (response)=>{
        console.log(response);
        window.location.reload();
      }
    );
  }
}
