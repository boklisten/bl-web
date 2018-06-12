import {TestBed, inject} from '@angular/core/testing';

import {UserCustomerItemService} from './user-customer-item.service';
import {Injectable} from "@angular/core";
import {BranchService} from "@wizardcoder/bl-connect";
import {DateService} from "../../date/date.service";
import {BranchStoreService} from "../../branch/branch-store.service";

@Injectable()
class BranchStubService {

}

@Injectable()
class DateStubService {

}

@Injectable()
class BranchStoreStubService {

}

describe('UserCustomerItemService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				UserCustomerItemService,
				{provide: BranchService, useValue: new BranchStubService()},
				{provide: DateService, useValue: new DateStubService()},
				{provide: BranchStoreService, useValue: new BranchStoreStubService()}
			]
		});
	});

	it('should be created', inject([UserCustomerItemService], (service: UserCustomerItemService) => {
		expect(service).toBeTruthy();
	}));
});
