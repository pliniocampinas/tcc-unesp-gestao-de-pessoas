import { TestBed } from '@angular/core/testing';

import { Imagem64Service } from './imagem64.service';

describe('Imagem64Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Imagem64Service = TestBed.get(Imagem64Service);
    expect(service).toBeTruthy();
  });
});
