import { TestBed } from '@angular/core/testing';

import { MovimentoService } from './movimento.service';

describe('MovimentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovimentoService = TestBed.get(MovimentoService);
    expect(service).toBeTruthy();
  });
});
