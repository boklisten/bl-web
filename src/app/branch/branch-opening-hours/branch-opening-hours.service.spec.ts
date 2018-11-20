import {TestBed, inject} from '@angular/core/testing';

import {BranchOpeningHoursService} from './branch-opening-hours.service';
import {Injectable} from "@angular/core";
import {OpeningHourService} from "@wizardcoder/bl-connect";
import { DateService } from '../../date/date.service';


@Injectable()
class OpeningHourStubService {
	getById(id: string) {
		return new Promise((resolve, reject) => {

		});
	}
}

@Injectable()
class DateStubService {
	
}

describe('BranchOpeningHoursService', () => {
	const openingHourStubService = new OpeningHourStubService();
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				BranchOpeningHoursService,
        {provide: OpeningHourService, useValue: openingHourStubService},
        {provide: DateService, useValue: DateStubService }
			]
		});
	});

	it('should be created', inject([BranchOpeningHoursService], (service: BranchOpeningHoursService) => {
		expect(service).toBeTruthy();
  }));

});
