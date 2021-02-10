import {TestBed, inject} from '@angular/core/testing';

import {CartDeliveryService} from './cart-delivery.service';
import {Injectable} from "@angular/core";
import {DeliveryService} from "@boklisten/bl-connect";
import {CartService} from "../cart.service";
import {CartOrderService} from "../cart-order/cart-order.service";
import {Subject} from "rxjs";
import {BranchStoreService} from "../../branch/branch-store.service";

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

@Injectable()
class BranchStoreStubService {
	getBranch() {

	}
}

describe('CartDeliveryService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CartDeliveryService,
				{provide: DeliveryService, useValue: new DeliveryStubService()},
				{provide: CartService, useValue: new CartStubService()},
				{provide: CartOrderService, useValue: new CartOrderStubService()},
				{provide: BranchStoreService, useClass: BranchStoreStubService}
			]
		});
	});

	it('should be created', inject([CartDeliveryService], (service: CartDeliveryService) => {
		expect(service).toBeTruthy();
	}));
});
