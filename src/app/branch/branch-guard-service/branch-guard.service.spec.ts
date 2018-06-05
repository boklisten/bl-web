import { TestBed, inject } from '@angular/core/testing';

import { BranchGuardService } from './branch-guard.service';

describe('BranchGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BranchGuardService]
    });
  });

  it('should be created', inject([BranchGuardService], (service: BranchGuardService) => {
    expect(service).toBeTruthy();
  }));
});
