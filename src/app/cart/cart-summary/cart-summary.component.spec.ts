import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CartSummaryComponent } from "./cart-summary.component";
import { Injectable, Pipe } from "@angular/core";
import { CartOrderService } from "../cart-order/cart-order.service";
import { CartDeliveryService } from "../cart-delivery/cart-delivery.service";
import { Subject } from "rxjs";
import { BlCommonModule } from "../../bl-common/bl-common.module";
import { CartPaymentService } from "../cart-payment/cart-payment.service";

@Injectable()
class CartOrderStubService {
	onOrderChange() {
		return new Subject();
	}

	getOrder() {}
}

@Injectable()
class CartDeliveryStubService {
	onDeliveryChange() {
		return new Subject();
	}

	getDelivery() {}
}

@Injectable()
class CartPaymentStubService {
	onPaymentChange() {
		return new Subject();
	}
	getPayment() {
		return null;
	}
}

@Pipe({ name: "blcDate" })
class BlcDateStubPipe {
	transform() {}
}

describe("CartSummaryComponent", () => {
	let component: CartSummaryComponent;
	let fixture: ComponentFixture<CartSummaryComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CartSummaryComponent, BlcDateStubPipe],
			providers: [
				{
					provide: CartOrderService,
					useValue: new CartOrderStubService(),
				},
				{
					provide: CartDeliveryService,
					useValue: new CartDeliveryStubService(),
				},
				{
					provide: CartPaymentService,
					useValue: new CartPaymentStubService(),
				},
			],
			imports: [BlCommonModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CartSummaryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
