import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
@Component({
  selector: 'app-home',
  standalone: true,
  imports:[RouterOutlet],
  templateUrl:'./home.component.html',
  styleUrl:'./home.component.scss'
})
export class AppComponent {
  title = 'ProyectoDiciembreFront';
}
