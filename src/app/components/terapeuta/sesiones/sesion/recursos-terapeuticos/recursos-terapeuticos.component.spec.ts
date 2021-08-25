import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosTerapeuticosComponent } from './recursos-terapeuticos.component';

describe('RecursosTerapeuticosComponent', () => {
  let component: RecursosTerapeuticosComponent;
  let fixture: ComponentFixture<RecursosTerapeuticosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursosTerapeuticosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursosTerapeuticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
