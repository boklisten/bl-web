import { TestBed } from "@angular/core/testing";

import { BlcSortService } from "./blc-sort.service";

describe("BlcSortService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: BlcSortService = TestBed.inject(BlcSortService);
		expect(service).toBeTruthy();
	});
});
