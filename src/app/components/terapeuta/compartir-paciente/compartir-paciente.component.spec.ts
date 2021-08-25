import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartirPacienteComponent } from './compartir-paciente.component';

describe('CompartirPacienteComponent', () => {
  let component: CompartirPacienteComponent;
  let fixture: ComponentFixture<CompartirPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompartirPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartirPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
