import { TestBed } from '@angular/core/testing';

import { PousarService } from './pousar.service';

describe('PousarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PousarService = TestBed.get(PousarService);
    expect(service).toBeTruthy();
  });
});
