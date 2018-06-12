import {TestBed, inject} from '@angular/core/testing';

import {BranchStoreService} from './branch-store.service';
import {Injectable} from "@angular/core";
import {UserService} from "../user/user.service";
import {BranchItemService, BranchService} from "@wizardcoder/bl-connect";


@Injectable()
class UserStubService {
	loggedIn() {

	}

	getUserDetail() {
		return new Promise((resolve, reject) => {

		});
	}
}

@Injectable()
class BranchStubService {
	getById(id: string) {
		return new Promise((resolve, reject) => {

		});
	}

	get() {
		return new Promise((resolve, reject) => {

		});
	}
}

@Injectable()
class BranchItemStubService {
	getManyByIds(ids: string[]) {
		return new Promise((resolve, reject) => {

		});
	}
}

describe('BranchStoreService', () => {
	const userStubService = new UserStubService();
	const branchStubService = new BranchStubService();
	const branchItemStubService = new BranchItemStubService();

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				BranchStoreService,
				{provide: UserService, useValue: userStubService},
				{provide: BranchService, useValue: branchStubService},
				{provide: BranchItemService, useValue: branchItemStubService}
			]
		});
	});

	it('should be created', inject([BranchStoreService], (service: BranchStoreService) => {
		expect(service).toBeTruthy();
	}));
});
