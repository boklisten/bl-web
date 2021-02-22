import { TestBed } from "@angular/core/testing";

import { UrlPathEditService } from "./url-path-edit.service";

describe("UrlPathEditService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: UrlPathEditService = TestBed.inject(UrlPathEditService);
		expect(service).toBeTruthy();
	});
});
