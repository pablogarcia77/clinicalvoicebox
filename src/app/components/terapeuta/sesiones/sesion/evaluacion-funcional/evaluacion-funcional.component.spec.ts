import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionFuncionalComponent } from './evaluacion-funcional.component';

describe('EvaluacionFuncionalComponent', () => {
  let component: EvaluacionFuncionalComponent;
  let fixture: ComponentFixture<EvaluacionFuncionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionFuncionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionFuncionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
