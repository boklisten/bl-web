import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BlApiError, Payment, PaymentMethod, Order} from "@wizardcoder/bl-model";
import {CartPaymentService} from "../cart-payment.service";
import {CartCheckoutService} from "../../cart-checkout/cart-checkout.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-cart-payment-dibs',
	templateUrl: './cart-payment-dibs.component.html',
	styleUrls: ['./cart-payment-dibs.component.scss']
})
export class CartPaymentDibsComponent implements OnInit, OnDestroy {
	
	public dibsCheckoutOptions: {
		checkoutKey: string,
		paymentId: string,
		containerId: string,
		language: string
	};
	
	@Input() payment: Payment;
	
	
	constructor(private _cartPaymentService: CartPaymentService, private _cartCheckoutService: CartCheckoutService, private _router: Router) {
	}
	
	ngOnInit() {
		this.onDibsPayment();
	}
	ngOnDestroy() {
	}
	
	onDibsPayment() {
		this.dibsCheckoutOptions = {
			checkoutKey: 'test-checkout-key-5d1531c5046e43f9ba5f44a40327d317',
			paymentId: this.payment.info['paymentId'],
			containerId: 'dibs-complete-checkout',
			language: 'nb-NO'
		};
		
		const checkout = new Dibs.Checkout(this.dibsCheckoutOptions);
		
		const cartCheckoutService = this._cartCheckoutService;
		const router = this._router;
		
		checkout.on('payment-completed', function (response) {
			cartCheckoutService.placeOrder().then(() => {
				router.navigateByUrl('u/order');
			}).catch(() => {
				console.log('cartPaymentService: could not place order after payment was completed');
			});
		});
	}
}
