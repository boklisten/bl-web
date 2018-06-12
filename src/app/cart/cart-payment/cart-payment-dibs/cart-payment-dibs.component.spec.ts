import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartPaymentDibsComponent} from './cart-payment-dibs.component';
import {Component, Injectable, Input} from "@angular/core";
import {CartPaymentService} from "../cart-payment.service";
import {CartCheckoutService} from "../../cart-checkout/cart-checkout.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";


@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon: any;
}

@Injectable()
class CartPaymentStubService {
	onPaymentChange() {
		return new Subject();
	}

	getPayment() {

	}
}

@Injectable()
class CartCheckoutStubService {

}

@Injectable()
class RouterStub {

}

describe('CartPaymentDibsComponent', () => {
	let component: CartPaymentDibsComponent;
	let fixture: ComponentFixture<CartPaymentDibsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				CartPaymentDibsComponent,
				FaIconStubComponent
			],
			providers: [
				{provide: CartPaymentService, useValue: new CartPaymentStubService()},
				{provide: CartCheckoutService, useValue: new CartCheckoutStubService()},
				{provide: Router, useValue: new RouterStub()}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CartPaymentDibsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
