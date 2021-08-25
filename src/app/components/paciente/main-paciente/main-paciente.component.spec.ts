import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPacienteComponent } from './main-paciente.component';

describe('MainPacienteComponent', () => {
  let component: MainPacienteComponent;
  let fixture: ComponentFixture<MainPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
