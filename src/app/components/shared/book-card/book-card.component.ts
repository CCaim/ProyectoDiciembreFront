import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Libro, LibroService } from '../../../service/libro.service';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent{

  @Input() libro: Libro | undefined;
  @Input() index: number | undefined;
  @Output() libroSelected: EventEmitter<number>;
  isGluten: boolean=false;

  constructor(private _libService: LibroService){
    this.libroSelected = new EventEmitter();
  }

  verLibro(){
    this.libroSelected.emit(this.index);
  }

}
