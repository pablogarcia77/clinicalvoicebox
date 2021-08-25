import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidasAerodinamicasComponent } from './medidas-aerodinamicas.component';

describe('MedidasAerodinamicasComponent', () => {
  let component: MedidasAerodinamicasComponent;
  let fixture: ComponentFixture<MedidasAerodinamicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedidasAerodinamicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedidasAerodinamicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
