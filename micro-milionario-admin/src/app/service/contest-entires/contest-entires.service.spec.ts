import { TestBed } from '@angular/core/testing';

import { ContestEntiresService } from './contest-entires.service';

describe('ContestEntiresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContestEntiresService = TestBed.get(ContestEntiresService);
    expect(service).toBeTruthy();
  });
});
