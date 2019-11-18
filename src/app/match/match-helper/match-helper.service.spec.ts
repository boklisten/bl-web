import { TestBed } from '@angular/core/testing';

import { MatchHelperService } from './match-helper.service';

describe('MatchHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatchHelperService = TestBed.get(MatchHelperService);
    expect(service).toBeTruthy();
  });
});
