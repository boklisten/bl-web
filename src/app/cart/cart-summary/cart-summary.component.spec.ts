import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartSummaryComponent} from './cart-summary.component';
import {Injectable} from "@angular/core";
import {CartOrderService} from "../cart-order/cart-order.service";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";
import {Subject} from "rxjs";
import {BlCommonModule} from "../../bl-common/bl-common.module";

@Injectable()
class CartOrderStubService {
	onOrderChange() {
		return new Subject();
	}

	getOrder() {

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


describe('CartSummaryComponent', () => {
	let component: CartSummaryComponent;
	let fixture: ComponentFixture<CartSummaryComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CartSummaryComponent],
			providers: [
				{provide: CartOrderService, useValue: new CartOrderStubService()},
				{provide: CartDeliveryService, useValue: new CartDeliveryStubService()}
			],
			imports: [
				BlCommonModule
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CartSummaryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
