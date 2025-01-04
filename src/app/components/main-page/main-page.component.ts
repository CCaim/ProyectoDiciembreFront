import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  currentIndex: number = 0; // Índice de la imagen actual
  totalItems: number = 3; // Total de elementos en el carrusel

  // Lista de imágenes del carrusel
  carouselImages: string[] = [
    'https://th.bing.com/th/id/OIP.mDzIoaqnw_whAiaTSz4iwgHaFj?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.V1Dyk5Y5prJZM9e2-caZlwHaFj?rs=1&pid=ImgDetMain',
    'https://preview.redd.it/flags-of-sardinia-piedmont-v0-dxh59yx8bkxb1.png?width=820&format=png&auto=webp&s=52f2ac16a8d4012ce2a1cacbc453c39ef6ef9569'
  ];

  ngOnInit(): void {
    // Iniciar el carrusel (cambio automático cada 3 segundos)
    setInterval(() => {
      this.nextImage();
    }, 3000); // Cambia cada 3 segundos
  }

  // Función para ir a la siguiente imagen
  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.totalItems;
  }

  // Función para ir a la imagen anterior
  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
  }
}
