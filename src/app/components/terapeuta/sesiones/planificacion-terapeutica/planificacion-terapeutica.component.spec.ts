import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificacionTerapeuticaComponent } from './planificacion-terapeutica.component';

describe('PlanificacionTerapeuticaComponent', () => {
  let component: PlanificacionTerapeuticaComponent;
  let fixture: ComponentFixture<PlanificacionTerapeuticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanificacionTerapeuticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificacionTerapeuticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
