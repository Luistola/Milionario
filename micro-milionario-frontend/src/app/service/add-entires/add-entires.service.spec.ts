import { TestBed } from '@angular/core/testing';

import { AddEntiresService } from './add-entires.service';

describe('AddEntiresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddEntiresService = TestBed.get(AddEntiresService);
    expect(service).toBeTruthy();
  });
});
