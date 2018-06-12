import {TestBed, inject} from '@angular/core/testing';

import {CartService} from './cart.service';
import {Injectable} from "@angular/core";
import {BranchStoreService} from "../branch/branch-store.service";
import {PriceService} from "../price/price.service";
import {DateService} from "../date/date.service";
import {UserService} from "../user/user.service";

@Injectable()
class BranchStoreStubService {

}

@Injectable()
class UserStubService {

}

@Injectable()
class PriceStubService {

}

@Injectable()
class DateStubService {

}


describe('CartService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CartService,
				{provide: BranchStoreService, useValue: new BranchStoreStubService()},
				{provide: UserService, useValue: new UserStubService()},
				{provide: PriceService, useValue: new PriceStubService()},
				{provide: DateService, useValue: new DateStubService()}
			]
		});
	});

	it('should be created', inject([CartService], (service: CartService) => {
		expect(service).toBeTruthy();
	}));
});
