import { TestBed, inject } from '@angular/core/testing';

import { BranchOpeningHoursService } from './branch-opening-hours.service';

describe('BranchOpeningHoursService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BranchOpeningHoursService]
    });
  });

  it('should be created', inject([BranchOpeningHoursService], (service: BranchOpeningHoursService) => {
    expect(service).toBeTruthy();
  }));
});
