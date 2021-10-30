import { TestBed } from '@angular/core/testing';

import { AutoperceptualService } from './autoperceptual.service';

describe('AutoperceptualService', () => {
  let service: AutoperceptualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoperceptualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
