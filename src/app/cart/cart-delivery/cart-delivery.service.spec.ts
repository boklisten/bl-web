import {TestBed, inject} from '@angular/core/testing';

import {CartDeliveryService} from './cart-delivery.service';
import {Injectable} from "@angular/core";
import {DeliveryService} from "@wizardcoder/bl-connect";
import {CartService} from "../cart.service";
import {CartOrderService} from "../order/cart-order.service";
import {Subject} from "rxjs/Subject";

@Injectable()
class DeliveryStubService {
}

@Injectable()
class CartStubService {

}

@Injectable()
class CartOrderStubService {
	getOrder() {

	}

	onOrderChange() {
		return new Subject();
	}

	onClearOrder() {
		return new Subject();
	}
}

describe('CartDeliveryService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CartDeliveryService,
				{provide: DeliveryService, useValue: new DeliveryStubService()},
				{provide: CartService, useValue: new CartStubService()},
				{provide: CartOrderService, useValue: new CartOrderStubService()}
			]
		});
	});

	it('should be created', inject([CartDeliveryService], (service: CartDeliveryService) => {
		expect(service).toBeTruthy();
	}));
});
