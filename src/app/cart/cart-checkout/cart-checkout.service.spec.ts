import {TestBed, inject} from '@angular/core/testing';

import {CartCheckoutService} from './cart-checkout.service';
import {Injectable} from "@angular/core";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";
import {CartPaymentService} from "../cart-payment/cart-payment.service";
import {CartOrderService} from "../cart-order/cart-order.service";
import {OrderService} from "@wizardcoder/bl-connect";
import {CartService} from "../cart.service";
import {UserService} from "../../user/user.service";
import {Router} from "@angular/router";

@Injectable()
class CartDeliveryStubService {
}

@Injectable()
class CartPaymentStubService {
}

@Injectable()
class UserStubService {
	loggedIn() {

	}
}

@Injectable()
class CartStubService {
}


@Injectable()
class CartOrderStubService {
	getOrder() {
	}
}

@Injectable()
class OrderStubService {
}

@Injectable()
class RouterStub {

}

describe('CartCheckoutService', () => {
	const cartDeliveryStubService = new CartDeliveryStubService();
	const cartPaymentStubService = new CartPaymentStubService();
	const cartOrderStubService = new CartOrderStubService();
	const orderStubService = new OrderStubService();
	const cartStubService = new CartStubService();
	const userStubService = new UserStubService();
	const routerStub = new RouterStub();

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CartCheckoutService,
				{provide: CartDeliveryService, useValue: cartDeliveryStubService},
				{provide: CartPaymentService, useValue: cartPaymentStubService},
				{provide: CartOrderService, useValue: cartOrderStubService},
				{provide: OrderService, useValue: orderStubService},
				{provide: CartService, useValue: cartStubService},
				{provide: UserService, useValue: userStubService},
				{provide: Router, useValue: routerStub}
			]
		});
	});

	it('should be created', inject([CartCheckoutService], (service: CartCheckoutService) => {
		expect(service).toBeTruthy();
	}));
});
