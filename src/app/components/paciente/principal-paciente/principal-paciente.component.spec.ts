import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalPacienteComponent } from './principal-paciente.component';

describe('PrincipalPacienteComponent', () => {
  let component: PrincipalPacienteComponent;
  let fixture: ComponentFixture<PrincipalPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
