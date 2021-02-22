import { TestBed, inject } from "@angular/core/testing";

import { BranchGuardService } from "./branch-guard.service";
import { BranchStoreService } from "../branch-store.service";
import { Router } from "@angular/router";

describe("BranchGuardService", () => {
	beforeEach(() => {
		const branchStoreServiceSpy = jasmine.createSpyObj(
			"BranchStoreService",
			["getActiveBranch", "fetchBranchItems"]
		);
		const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

		TestBed.configureTestingModule({
			providers: [
				BranchGuardService,
				{
					provide: BranchStoreService,
					useValue: branchStoreServiceSpy,
				},
				{ provide: Router, useValue: routerSpy },
			],
		});
	});

	it("should be created", inject(
		[BranchGuardService],
		(service: BranchGuardService) => {
			expect(service).toBeTruthy();
		}
	));
});
