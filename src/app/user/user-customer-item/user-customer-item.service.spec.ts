import { TestBed, inject } from "@angular/core/testing";

import { UserCustomerItemService } from "./user-customer-item.service";
import { Injectable } from "@angular/core";
import { BranchService, CustomerItemService } from "@boklisten/bl-connect";
import { DateService } from "../../date/date.service";
import { BranchStoreService } from "../../branch/branch-store.service";
import { UserService } from "../user.service";

@Injectable()
class BranchStubService {}

@Injectable()
class DateStubService {}

@Injectable()
class BranchStoreStubService {}

@Injectable()
class UserStubService {}

@Injectable()
class CustomerItemStubService {}

describe("UserCustomerItemService", () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				UserCustomerItemService,
				{ provide: BranchService, useValue: new BranchStubService() },
				{ provide: DateService, useValue: new DateStubService() },
				{
					provide: BranchStoreService,
					useValue: new BranchStoreStubService(),
				},
				{ provide: UserService, useClass: UserStubService },
				{
					provide: CustomerItemService,
					useClass: CustomerItemStubService,
				},
			],
		});
	});

	it("should be created", inject(
		[UserCustomerItemService],
		(service: UserCustomerItemService) => {
			expect(service).toBeTruthy();
		}
	));
});
