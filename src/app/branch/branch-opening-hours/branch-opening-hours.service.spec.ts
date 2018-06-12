import {TestBed, inject} from '@angular/core/testing';

import {BranchOpeningHoursService} from './branch-opening-hours.service';
import {Injectable} from "@angular/core";
import {OpeningHourService} from "@wizardcoder/bl-connect";


@Injectable()
class OpeningHourStubService {
	getById(id: string) {
		return new Promise((resolve, reject) => {

		});
	}
}

describe('BranchOpeningHoursService', () => {
	const openingHourStubService = new OpeningHourStubService();
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				BranchOpeningHoursService,
				{provide: OpeningHourService, useValue: openingHourStubService}
			]
		});
	});

	it('should be created', inject([BranchOpeningHoursService], (service: BranchOpeningHoursService) => {
		expect(service).toBeTruthy();
	}));
});
