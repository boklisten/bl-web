import { TestBed } from "@angular/core/testing";

import { CartConfirmService } from "./cart-confirm.service";

describe("CartConfirmService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: CartConfirmService = TestBed.inject(CartConfirmService);
		expect(service).toBeTruthy();
	});
});
