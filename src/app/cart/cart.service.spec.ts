import {TestBed, inject} from '@angular/core/testing';

import {CartService} from './cart.service';
import {Injectable} from "@angular/core";
import {BranchStoreService} from "../branch/branch-store.service";
import {PriceService} from "../price/price.service";
import {DateService} from "../date/date.service";
import {UserService} from "../user/user.service";
import {Subject} from "rxjs/internal/Subject";
import {AuthLoginService} from "@wizardcoder/bl-login";

@Injectable()
class BranchStoreStubService {
	onBranchChange() {
		return new Subject();
	}
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

@Injectable()
class AuthLoginStubService {
	onLogout() {
		return new Subject();
	}
}


describe('CartService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CartService,
				{provide: BranchStoreService, useValue: new BranchStoreStubService()},
				{provide: UserService, useValue: new UserStubService()},
				{provide: PriceService, useValue: new PriceStubService()},
				{provide: DateService, useValue: new DateStubService()},
				{provide: AuthLoginService, useClass: AuthLoginStubService}
			]
		});
	});

	it('should be created', inject([CartService], (service: CartService) => {
		expect(service).toBeTruthy();
	}));
});
