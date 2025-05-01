import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevoUsuario } from '../../models/nuevo-usuario';
import { AuthService } from '../../service/auth.service';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nuevoUsuario: NuevoUsuario | undefined;
  nombreUsuario: string = "";
  email: string = "";
  password: string = "";
  errMsj: string = "";
  isLogged = false;
  isRegistroFail = false;
  siteKey:string;

  constructor(
    private _tokenService: TokenService,
    private _authService: AuthService,
    private _router: Router
  ) { 
    this.siteKey = "6LeOS3UmAAAAAFaxim-B3LNw1ifyg1BHsCp1oL58";
  }

  ngOnInit() {
    if (this._tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombreUsuario, this.email, this.password);
    this._authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        this._router.navigate(['/login']);
      },
      err => {
        this.isRegistroFail = true;
        this.errMsj = err.error.mensaje;
        console.log(err.error.message);
      }
    );
  }
}
