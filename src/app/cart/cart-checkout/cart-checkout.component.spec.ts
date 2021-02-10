import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartCheckoutComponent} from './cart-checkout.component';
import {Component, EventEmitter, Injectable, Input, Output, Pipe} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CartCheckoutService} from "./cart-checkout.service";
import {CartOrderService} from "../cart-order/cart-order.service";
import {BranchStoreService} from "../../branch/branch-store.service";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";
import {CartPaymentService} from "../cart-payment/cart-payment.service";
import {UserService} from "../../user/user.service";
import {CartService} from "../cart.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {Branch} from "@boklisten/bl-model";
import {UserEditService} from "../../user/user-edit/user-edit.service";
import {AuthLoginService} from "@boklisten/bl-login";
import {calcBindingFlags} from "@angular/core/src/view/util";

@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon: any;
}

@Component({selector: 'ngb-alert', template: ''})
class NgbAlertStubComponent {
	@Input() type: any;
}

@Injectable()
class UserEditStubServie {

}

@Component({selector: 'app-cart-delivery', template: ''})
class CartDeliveryStubComponent {}

@Component({selector: 'app-cart-summary', template: ''})
class CartSummaryStubComponent {}

@Component({selector: 'app-cart-payment', template: ''})
class CartPaymentStubComponent {}

@Injectable()
class CartCheckoutStubService {
}

@Injectable()
class CartOrderStubService {
	onOrderChange() {
		return new Subject();
	}
}

@Injectable()
class BranchStoreStubService {
	getBranch(): Branch {
		return {
			id: '',
			paymentInfo: {
				responsible: true,
				extendPeriods: [{} as any],
				rentPeriods: [{} as any],
				buyout: {
					percentage: 0.1
				},
				acceptedMethods: []
			},
			name: '',
			branchItems: [],
		};
	}
}

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
	onCartChange() {
		return new Subject();
	}

	getCart() {
		return [];
	}

	shouldPay() {
		return true;
	}
}


@Injectable()
class AuthLoginStubService {
}

@Injectable()
class RouterStub {

}


@Pipe({name: 'blcPrice'})
class BlcPriceStubPipe {
}

@Component({selector: 'app-cart-agreement', template: ''})
class CartAgreementStubComponent {
	@Input() confirmed: boolean;
	@Output() confirmedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
}


describe('CartCheckoutComponent', () => {
	let component: CartCheckoutComponent;
	let fixture: ComponentFixture<CartCheckoutComponent>;

	const cartOrderStubService = new CartOrderStubService();
	const branchStoreStubService = new BranchStoreStubService();
	const cartDeliveryStubService = new CartDeliveryStubService();
	const cartPaymentStubService = new CartPaymentStubService();
	const userStubService = new UserStubService();
	const cartStubService = new CartStubService();
	const cartCheckoutStubService = new CartCheckoutStubService();
	const routerStub = new RouterStub();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				CartCheckoutComponent,
				FaIconStubComponent,
				CartDeliveryStubComponent,
				CartSummaryStubComponent,
				CartPaymentStubComponent,
				NgbAlertStubComponent,
				BlcPriceStubPipe,
				CartAgreementStubComponent
			],
			providers: [
				{provide: CartCheckoutService, useValue: cartCheckoutStubService},
				{provide: CartOrderService, useValue: cartOrderStubService},
				{provide: BranchStoreService, useValue: branchStoreStubService},
				{provide: CartDeliveryService, useValue: cartDeliveryStubService},
				{provide: CartPaymentService, useValue: cartPaymentStubService},
				{provide: UserService, useValue: userStubService},
				{provide: CartService, useValue: cartStubService},
				{provide: Router, useValue: routerStub},
				{provide: UserEditService, useClass: UserEditStubServie},
				{provide: AuthLoginService, useClass: AuthLoginStubService}
			],
			imports: [
				FormsModule
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CartCheckoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
