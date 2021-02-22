import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import {
	Component,
	Input,
	Output,
	Injectable,
	EventEmitter,
	Pipe,
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CartService } from "../cart.service";

import { CartOrderCheckoutComponent } from "./cart-order-checkout.component";
import { CartOrderCheckoutService } from "./cart-order-checkout.service";

@Component({ selector: "fa-icon", template: "" })
class FaIconStubComponent {
	@Input() icon;
	@Input() size;
	@Input() spin;
	@Input() pulse;
}

@Component({ selector: "ngb-progressbar", template: "" })
class NgbProgressbarStubComponent {
	@Input() type;
	@Input() height;
	@Input() value;
}

@Component({ selector: "app-cart-agreement", template: "" })
class CartAgreementStubComponent {
	@Input() confirmed;
	@Output() confirmedChange = new EventEmitter<any>();
}

@Component({ selector: "app-cart-summary", template: "" })
class CartSummaryStubComponent {
	@Output() confirmSummary = new EventEmitter<any>();
}

@Component({ selector: "app-cart-checkout", template: "" })
class CartCheckoutStubComponent {
	@Output() confirmSummary = new EventEmitter<any>();
}

@Component({ selector: "app-cart-delivery", template: "" })
class CartDeliveryStubComponent {
	@Output() confirmDelivery = new EventEmitter<any>();
}

@Component({ selector: "app-cart-payment", template: "" })
class CartPaymentStubComponent {}

@Pipe({ name: "blcPrice" })
class BlcPriceStubPipe {
	transform() {}
}

@Injectable()
class RouterMock {
	navigateByUrl() {}
}

@Injectable()
class NgModalStub {}

@Injectable()
class CartServiceStub {
	public getCart() {
		return [];
	}
}

describe("CartOrderCheckoutComponent", () => {
	let component: CartOrderCheckoutComponent;
	let fixture: ComponentFixture<CartOrderCheckoutComponent>;
	const cartOrderCheckoutServiceSpy = jasmine.createSpyObj(
		"CartOrderCheckoutService",
		["calculateCartSteps", "getTotalAmount", "onStartCheckout"]
	);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				CartOrderCheckoutComponent,
				NgbProgressbarStubComponent,
				FaIconStubComponent,
				CartAgreementStubComponent,
				CartDeliveryStubComponent,
				CartSummaryStubComponent,
				CartCheckoutStubComponent,
				CartPaymentStubComponent,
				BlcPriceStubPipe,
			],
			providers: [
				{
					provide: CartOrderCheckoutService,
					useValue: cartOrderCheckoutServiceSpy,
				},
				{
					provide: CartService,
					useClass: CartServiceStub,
				},
				{
					provide: Router,
					useClass: RouterMock,
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CartOrderCheckoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	/*
	it("should create", () => {
		expect(component).toBeTruthy();
	});
   */
});
