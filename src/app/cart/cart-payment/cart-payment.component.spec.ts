import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CartPaymentComponent } from "./cart-payment.component";
import { Component, Injectable, Input } from "@angular/core";
import { CartPaymentService } from "./cart-payment.service";
import { CartOrderService } from "../cart-order/cart-order.service";
import { CartDeliveryService } from "../cart-delivery/cart-delivery.service";
import { Subject } from "rxjs";

@Injectable()
class CartPaymentStubService {
	onPaymentChange() {
		return new Subject();
	}

	getPayment() {}

	createPayment() {
		return new Promise(() => {});
	}

	clear() {}
}

@Injectable()
class CartOrderStubService {}

@Injectable()
class CartDeliveryStubService {
	onDeliveryFailure() {
		return new Subject();
	}
}

@Component({ selector: "fa-icon", template: "" })
class FaIconStubComponent {
	@Input() icon: any;
	@Input() spin: any;
	@Input() size: any;
}

@Component({ selector: "app-cart-summary", template: "" })
class CartSummaryStubComponent {}

@Component({ selector: "app-cart-payment-dibs", template: "" })
class CartPaymentDibsStubComponent {}

describe("CartPaymentComponent", () => {
	let component: CartPaymentComponent;
	let fixture: ComponentFixture<CartPaymentComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				CartPaymentComponent,
				FaIconStubComponent,
				CartPaymentDibsStubComponent,
				CartSummaryStubComponent
			],
			providers: [
				{
					provide: CartPaymentService,
					useClass: CartPaymentStubService
				},
				{
					provide: CartOrderService,
					useValue: new CartOrderStubService()
				},
				{
					provide: CartDeliveryService,
					useValue: new CartDeliveryStubService()
				}
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CartPaymentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
