import {Component, OnInit} from '@angular/core';
import {CartPaymentService} from "./cart-payment.service";
import {CartService} from "../cart.service";
import {PaymentMethod} from "bl-model/dist/payment/payment-method/payment-method";
import {BlApiError, Payment} from "bl-model";


@Component({
	selector: 'app-cart-payment',
	templateUrl: './cart-payment.component.html',
	styleUrls: ['./cart-payment.component.scss']
})
export class CartPaymentComponent implements OnInit {
	
	public method: PaymentMethod;
	public payment: Payment;
	public dibsCheckoutOptions: {
		checkoutKey: string,
		paymentId: string,
		containerId: string,
		language: string
	};
	
	public showPayment: boolean;
	
	constructor(private _cartPaymentService: CartPaymentService, private _cartService: CartService) {
		this.showPayment = false;
	
	}
	
	ngOnInit() {
		
		if (this._cartService.isEmpty()) {
			return;
		}
		
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
			this.showPayment = true;
			
			const checkout = new Dibs.Checkout(this.dibsCheckoutOptions);
			
			checkout.on('payment-completed', (response) => {
				console.log('the payment is completed!', response);
			});
			
		}).catch((blApiErr: BlApiError) => {
			console.log('the api err', blApiErr);
		});
	}
	
}
