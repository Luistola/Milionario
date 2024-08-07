import { TestBed } from '@angular/core/testing';

import { TopHeaderService } from './top-header.service';

describe('TopHeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopHeaderService = TestBed.get(TopHeaderService);
    expect(service).toBeTruthy();
  });
});
