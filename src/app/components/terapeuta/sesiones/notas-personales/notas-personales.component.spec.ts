import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasPersonalesComponent } from './notas-personales.component';

describe('NotasPersonalesComponent', () => {
  let component: NotasPersonalesComponent;
  let fixture: ComponentFixture<NotasPersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotasPersonalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
