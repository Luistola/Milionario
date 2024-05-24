import { TestBed } from '@angular/core/testing';

import { MusicaService } from './musica.service';

describe('MusicaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MusicaService = TestBed.get(MusicaService);
    expect(service).toBeTruthy();
  });
});
