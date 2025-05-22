import { Component, OnInit } from '@angular/core';

interface Libro {
  titulo: string;
  autor: string;
  descripcion: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  libros: Libro[] = [
    {
      titulo: 'El Viaje de la Imaginación',
      autor: 'Lucía Fernández',
      descripcion: 'Un recorrido por mundos fantásticos donde todo es posible.'
    },
    {
      titulo: 'Ciencia para Curiosos',
      autor: 'Dr. Mario López',
      descripcion: 'Explicaciones sencillas de grandes misterios de la ciencia.'
    },
    {
      titulo: 'Sueños de Papel',
      autor: 'Ana María Torres',
      descripcion: 'Relatos cortos que te harán soñar despierto.'
    },
    {
      titulo: 'Código y Café',
      autor: 'Pedro Ramírez',
      descripcion: 'Reflexiones y anécdotas del mundo de la programación.'
    },
    {
      titulo: 'Historias al Atardecer',
      autor: 'Sofía Gómez',
      descripcion: 'Cuentos para relajarse al final del día.'
    }
  ];

  librosAleatorios: Libro[] = [];

  ngOnInit() {
    this.librosAleatorios = this.obtenerLibrosAleatorios(3);
  }

  obtenerLibrosAleatorios(cantidad: number): Libro[] {
    const copia = [...this.libros];
    const seleccionados: Libro[] = [];
    while (seleccionados.length < cantidad && copia.length > 0) {
      const index = Math.floor(Math.random() * copia.length);
      seleccionados.push(copia.splice(index, 1)[0]);
    }
    return seleccionados;
  }
}