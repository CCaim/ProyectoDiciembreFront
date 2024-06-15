import { Component } from '@angular/core';

@Component({
  selector: 'app-main-carousel',
  standalone: true,
  imports: [],
  templateUrl: './main-carousel.component.html',
  styleUrl: './main-carousel.component.scss'
})
export class MainCarouselComponent {
  carouselData: any

  ngOnInit(){
    this.carouselData=homeCarouselData;
  }
}
