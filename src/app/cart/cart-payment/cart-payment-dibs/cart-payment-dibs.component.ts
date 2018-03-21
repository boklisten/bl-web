import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BlApiError, Payment, PaymentMethod} from "bl-model";
import {CartPaymentService} from "../cart-payment.service";

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
	
	@Input() method: PaymentMethod;
	
	public payment: Payment;
	
	constructor(private _cartPaymentService: CartPaymentService) {
	}
	
	ngOnInit() {
		this.onDibsPayment();
	}
	ngOnDestroy() {
		console.log('destroyedd');
	}
	
	onDibsPayment() {
		this.dibsCheckoutOptions = {
			checkoutKey: 'test-checkout-key-5d1531c5046e43f9ba5f44a40327d317',
			paymentId: '',
			containerId: 'dibs-complete-checkout',
			language: 'nb-NO'
		};
		
		
		this.method = "dibs";
		
		this._cartPaymentService.getPayment(this.method).then((payment: Payment) => {
			this.payment = payment;
			this.dibsCheckoutOptions.paymentId = payment.id;
			
			const checkout = new Dibs.Checkout(this.dibsCheckoutOptions);
			
			checkout.on('payment-completed', (response) => {
				console.log('the payment is completed!', response);
			});
			
		}).catch((blApiErr: BlApiError) => {
			console.log('the api err', blApiErr);
		});
	}
}
