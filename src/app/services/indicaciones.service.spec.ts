import { TestBed } from '@angular/core/testing';

import { IndicacionesService } from './indicaciones.service';

describe('IndicacionesService', () => {
  let service: IndicacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
