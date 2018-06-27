import {TestBed, inject} from '@angular/core/testing';

import {CartPaymentService} from './cart-payment.service';
import {Injectable} from "@angular/core";
import {BranchService, PaymentService} from "@wizardcoder/bl-connect";
import {BranchStoreService} from "../../branch/branch-store.service";
import {CartOrderService} from "../cart-order/cart-order.service";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";
import {Subject} from "rxjs";

@Injectable()
class PaymentStubService {

}

@Injectable()
class CartOrderStubService {
	onClearOrder() {
		return new Subject();
	}
}

@Injectable()
class BranchStoreStubService {
	getBranch() {

	}
}

@Injectable()
class CartDeliveryStubService {
	onDeliveryChange() {
		return new Subject();
	}
	getDelivery() {

	}
}


describe('CartPaymentService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CartPaymentService,
				{provide: PaymentService, useValue: new PaymentStubService()},
				{provide: BranchStoreService, useValue: new BranchStoreStubService()},
				{provide: CartOrderService, useValue: new CartOrderStubService()},
				{provide: CartDeliveryService, useValue: new CartDeliveryStubService()}
			]
		});
	});

	it('should be created', inject([CartPaymentService], (service: CartPaymentService) => {
		expect(service).toBeTruthy();
	}));
});
