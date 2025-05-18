import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorRecetaComponent } from './buscador-libro.component';

describe('BuscadorRecetaComponent', () => {
  let component: BuscadorRecetaComponent;
  let fixture: ComponentFixture<BuscadorRecetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscadorRecetaComponent]
    });
    fixture = TestBed.createComponent(BuscadorRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
