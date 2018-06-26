import {TestBed, inject} from '@angular/core/testing';

import {UserService} from './user.service';
import {Injectable} from "@angular/core";
import {CustomerItemService, TokenService, UserDetailService} from "@wizardcoder/bl-connect";
import {AuthLoginService} from "@wizardcoder/bl-login";
import {Subject} from "rxjs/internal/Subject";

@Injectable()
class TokenStubService {

}

@Injectable()
class UserDetailStubService {

}

@Injectable()
class CustomerItemStubService {

}

@Injectable()
class AuthLoginStubService {
	onLogin() {
		return new Subject();
	}

	onLogout() {
		return new Subject();
	}

	isLoggedIn() {
		return true;
	}
}

describe('UserService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				UserService,
				{provide: TokenService, useValue: new TokenStubService()},
				{provide: UserDetailService, useValue: new UserDetailStubService()},
				{provide: CustomerItemService, useValue: new CustomerItemStubService()},
				{provide: AuthLoginService, useClass: AuthLoginStubService}
			]
		});
	});

	it('should be created', inject([UserService], (service: UserService) => {
		expect(service).toBeTruthy();
	}));
});
