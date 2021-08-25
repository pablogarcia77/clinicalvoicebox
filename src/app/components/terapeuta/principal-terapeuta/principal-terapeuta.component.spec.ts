import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalTerapeutaComponent } from './principal-terapeuta.component';

describe('PrincipalTerapeutaComponent', () => {
  let component: PrincipalTerapeutaComponent;
  let fixture: ComponentFixture<PrincipalTerapeutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalTerapeutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalTerapeutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
