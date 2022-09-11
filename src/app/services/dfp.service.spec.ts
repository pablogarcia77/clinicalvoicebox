import { TestBed } from '@angular/core/testing';

import { DfpService } from './dfp.service';

describe('DfpService', () => {
  let service: DfpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DfpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
