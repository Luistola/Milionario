import { TestBed } from '@angular/core/testing';

import { VencedorClienteService } from './vencedor-cliente.service';

describe('VencedorClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VencedorClienteService = TestBed.get(VencedorClienteService);
    expect(service).toBeTruthy();
  });
});
