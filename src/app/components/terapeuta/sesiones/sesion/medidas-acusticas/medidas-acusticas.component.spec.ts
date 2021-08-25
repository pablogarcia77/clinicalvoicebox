import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidasAcusticasComponent } from './medidas-acusticas.component';

describe('MedidasAcusticasComponent', () => {
  let component: MedidasAcusticasComponent;
  let fixture: ComponentFixture<MedidasAcusticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedidasAcusticasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedidasAcusticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
