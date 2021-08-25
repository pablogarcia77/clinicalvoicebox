import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicacionesTerapeuticasComponent } from './indicaciones-terapeuticas.component';

describe('IndicacionesTerapeuticasComponent', () => {
  let component: IndicacionesTerapeuticasComponent;
  let fixture: ComponentFixture<IndicacionesTerapeuticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicacionesTerapeuticasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicacionesTerapeuticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
