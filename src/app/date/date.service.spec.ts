import {TestBed, inject} from '@angular/core/testing';

import {DateService} from './date.service';
import {Injectable} from "@angular/core";
import {BranchStoreService} from "../branch/branch-store.service";
import {OpeningHour } from '@boklisten/bl-model';

@Injectable()
class BranchStoreStubService {

}

describe('DateService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				DateService,
				{provide: BranchStoreService, useValue: new BranchStoreStubService()}
			]
		});
	});

	it('should be created', inject([DateService], (service: DateService) => {
		expect(service).toBeTruthy();
  }));

  describe('#sortOpeningHours', () => {
    it('should sort dates with lowest date on index 0', inject([DateService], (service: DateService) => {
      const openingHours: OpeningHour[] = [
        {
          id: 'openingHour1',
          from: new Date(2001, 1, 1),
          to: new Date(),
          branch: 'branch1',
        },
        {
          id: 'openingHour1',
          from: new Date(1999, 1, 1),
          to: new Date(),
          branch: 'branch1',
        },
        {
          id: 'openingHour1',
          from: new Date(1999, 1, 2),
          to: new Date(),
          branch: 'branch1',
        },
        {
          id: 'openingHour1',
          from: new Date(2000, 2, 10),
          to: new Date(),
          branch: 'branch1',
        }
      ];
      const expectedResult = [openingHours[1], openingHours[2], openingHours[3], openingHours[0]];
      const result = service.sortOpeningHours(openingHours);

      expect(result).toEqual(expectedResult);
    }));
  })
});
