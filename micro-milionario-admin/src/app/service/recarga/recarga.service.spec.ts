import { TestBed } from '@angular/core/testing';

import { RecargaService } from './recarga.service';

describe('RecargaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecargaService = TestBed.get(RecargaService);
    expect(service).toBeTruthy();
  });
});
