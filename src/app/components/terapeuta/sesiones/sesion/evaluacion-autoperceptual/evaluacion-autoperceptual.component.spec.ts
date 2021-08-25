import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionAutoperceptualComponent } from './evaluacion-autoperceptual.component';

describe('EvaluacionAutoperceptualComponent', () => {
  let component: EvaluacionAutoperceptualComponent;
  let fixture: ComponentFixture<EvaluacionAutoperceptualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionAutoperceptualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionAutoperceptualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
