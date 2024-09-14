import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Libro, LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent implements OnInit{

  @Input() libro: Libro | undefined;
  @Input() index: number | undefined;
  @Output() libroSelected: EventEmitter<number>;
  isGluten: boolean=false;

  constructor(private _libService: LibroService){
    this.libroSelected = new EventEmitter();
  }

  ngOnInit(): void {
    this.isGluten = this._libService.tieneGluten(this.libro!);
    console.log(this.isGluten);
  }

  verLibro(){
    this.libroSelected.emit(this.index);
  }

}
