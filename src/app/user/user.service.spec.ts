import {TestBed, inject} from '@angular/core/testing';

import {UserService} from './user.service';
import {Injectable} from "@angular/core";
import {CustomerItemService, TokenService, UserDetailService} from "@wizardcoder/bl-connect";

@Injectable()
class TokenStubService {

}

@Injectable()
class UserDetailStubService {

}

@Injectable()
class CustomerItemStubService {

}

describe('UserService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				UserService,
				{provide: TokenService, useValue: new TokenStubService()},
				{provide: UserDetailService, useValue: new UserDetailStubService()},
				{provide: CustomerItemService, useValue: new CustomerItemStubService()}
			]
		});
	});

	it('should be created', inject([UserService], (service: UserService) => {
		expect(service).toBeTruthy();
	}));
});
