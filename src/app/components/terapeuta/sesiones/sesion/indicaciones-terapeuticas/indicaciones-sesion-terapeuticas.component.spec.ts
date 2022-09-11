import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicacionesTerapeuticasSesionComponent } from './indicaciones-sesion-terapeuticas.component';

describe('IndicacionesTerapeuticasComponent', () => {
  let component: IndicacionesTerapeuticasSesionComponent;
  let fixture: ComponentFixture<IndicacionesTerapeuticasSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicacionesTerapeuticasSesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicacionesTerapeuticasSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
