import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaFoniatricaComponent } from './ficha-foniatrica.component';

describe('FichaFoniatricaComponent', () => {
  let component: FichaFoniatricaComponent;
  let fixture: ComponentFixture<FichaFoniatricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaFoniatricaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaFoniatricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
