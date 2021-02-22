import { TestBed } from "@angular/core/testing";

import { MatchStoreService } from "./match-store.service";

describe("MatchStoreService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: MatchStoreService = TestBed.inject(MatchStoreService);
		expect(service).toBeTruthy();
	});
});
