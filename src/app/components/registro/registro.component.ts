import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  username: string = '';
  password: string = '';
  email: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.username, this.password, this.email).subscribe(
      data => {
        this.router.navigate(['/login']);
      },
      err => {
        console.error(err);
      }
    );
  }
}