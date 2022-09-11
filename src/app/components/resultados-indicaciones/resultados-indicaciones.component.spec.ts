import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosIndicacionesComponent } from './resultados-indicaciones.component';

describe('ResultadosIndicacionesComponent', () => {
  let component: ResultadosIndicacionesComponent;
  let fixture: ComponentFixture<ResultadosIndicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadosIndicacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosIndicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
