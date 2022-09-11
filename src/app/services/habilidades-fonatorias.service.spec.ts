import { TestBed } from '@angular/core/testing';

import { HabilidadesFonatoriasService } from './habilidades-fonatorias.service';

describe('HabilidadesFonatoriasService', () => {
  let service: HabilidadesFonatoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabilidadesFonatoriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
