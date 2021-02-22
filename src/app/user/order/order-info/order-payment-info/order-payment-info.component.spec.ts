import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OrderPaymentInfoComponent } from "./order-payment-info.component";
import { Component, Injectable, Input, Pipe } from "@angular/core";
import { PaymentService } from "@boklisten/bl-connect";

@Injectable()
class PaymentStubService {}

@Component({ selector: "fa-icon", template: "" })
class FaIconStubComponent {
	@Input() icon: any;
}

@Pipe({ name: "blcPrice" })
class BlcPriceStubPipe {}

describe("OrderPaymentInfoComponent", () => {
	let component: OrderPaymentInfoComponent;
	let fixture: ComponentFixture<OrderPaymentInfoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				OrderPaymentInfoComponent,
				FaIconStubComponent,
				BlcPriceStubPipe,
			],
			providers: [
				{ provide: PaymentService, useValue: new PaymentStubService() },
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OrderPaymentInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
