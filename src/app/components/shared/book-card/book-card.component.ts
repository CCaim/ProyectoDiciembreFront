import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Libro, LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
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
