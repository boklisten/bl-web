import { TestBed, inject } from "@angular/core/testing";

import { UserService } from "./user.service";
import { Injectable } from "@angular/core";
import {
	CustomerItemService,
	TokenService,
	UserDetailService,
} from "@boklisten/bl-connect";
import { AuthLoginService } from "@boklisten/bl-login";
import { Subject } from "rxjs/internal/Subject";

@Injectable()
class TokenStubService {
	public haveAccessToken() {
		return true;
	}

	public getAccessTokenBody() {
		return {
			details: {},
		};
	}
}

@Injectable()
class UserDetailStubService {
	public getById(id: any) {
		return new Subject().asObservable();
	}
}

@Injectable()
class CustomerItemStubService {}

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

describe("UserService", () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				UserService,
				{ provide: TokenService, useValue: new TokenStubService() },
				{
					provide: UserDetailService,
					useClass: UserDetailStubService,
				},
				{
					provide: CustomerItemService,
					useValue: new CustomerItemStubService(),
				},
				{ provide: AuthLoginService, useClass: AuthLoginStubService },
			],
		});
	});
	/*
	it("should be created", inject([UserService], (service: UserService) => {
		expect(service).toBeTruthy();
	}));
   */
});
