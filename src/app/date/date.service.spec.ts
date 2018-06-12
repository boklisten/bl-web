import {TestBed, inject} from '@angular/core/testing';

import {DateService} from './date.service';
import {Injectable} from "@angular/core";
import {BranchStoreService} from "../branch/branch-store.service";

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
});
