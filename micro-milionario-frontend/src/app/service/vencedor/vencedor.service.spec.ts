import { TestBed } from '@angular/core/testing';

import { VencedorService } from './vencedor.service';

describe('VencedorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VencedorService = TestBed.get(VencedorService);
    expect(service).toBeTruthy();
  });
});
