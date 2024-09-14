import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSearcherComponent } from './book-searcher.component';

describe('BookSearcherComponent', () => {
  let component: BookSearcherComponent;
  let fixture: ComponentFixture<BookSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookSearcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
