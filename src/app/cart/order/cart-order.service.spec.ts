import {TestBed, inject} from '@angular/core/testing';

import {CartOrderService} from './cart-order.service';

describe('CartOrderService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [CartOrderService]
		});
	});

	it('should be created', inject([CartOrderService], (service: CartOrderService) => {
		expect(service).toBeTruthy();
	}));
});
