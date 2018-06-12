import {TestBed, inject} from '@angular/core/testing';

import {CartOrderService} from './cart-order.service';
import {Injectable} from "@angular/core";
import {CartService} from "../cart.service";
import {OrderService} from "@wizardcoder/bl-connect";
import {Subject} from "rxjs/Subject";

@Injectable()
class CartStubService {
	getSize() {

	}

	onCartChange() {
		return new Subject();
	}
}

@Injectable()
class OrderStubService {

}

describe('CartOrderService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CartOrderService,
				{provide: CartService, useValue: new CartStubService()},
				{provide: OrderService, useValue: new OrderStubService()}
			]
		});
	});

	it('should be created', inject([CartOrderService], (service: CartOrderService) => {
		expect(service).toBeTruthy();
	}));
});
