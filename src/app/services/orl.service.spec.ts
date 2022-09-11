import { TestBed } from '@angular/core/testing';

import { OrlService } from './orl.service';

describe('OrlService', () => {
  let service: OrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
