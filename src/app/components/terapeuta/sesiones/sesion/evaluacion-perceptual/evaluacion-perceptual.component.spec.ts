import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionPerceptualComponent } from './evaluacion-perceptual.component';

describe('EvaluacionPerceptualComponent', () => {
  let component: EvaluacionPerceptualComponent;
  let fixture: ComponentFixture<EvaluacionPerceptualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionPerceptualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionPerceptualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
