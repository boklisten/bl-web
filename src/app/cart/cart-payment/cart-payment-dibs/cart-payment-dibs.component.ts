import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BlApiError, Payment, PaymentMethod, Order} from "bl-model";
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
	
	@Input() order: Order;
	@Output() payment: EventEmitter<Payment>;
	private currentPayment: Payment;
	
	constructor(private _cartPaymentService: CartPaymentService) {
		this.payment = new EventEmitter();
	}
	
	ngOnInit() {
		this.onDibsPayment();
	}
	ngOnDestroy() {
	}
	
	onDibsPayment() {
		this.dibsCheckoutOptions = {
			checkoutKey: 'test-checkout-key-5d1531c5046e43f9ba5f44a40327d317',
			paymentId: '',
			containerId: 'dibs-complete-checkout',
			language: 'nb-NO'
		};
		
		this._cartPaymentService.payDibs(this.order).then((payment: Payment) => {
			this.currentPayment = payment;
			this.dibsCheckoutOptions.paymentId = payment.id;
			this.payment.emit(this.currentPayment);
			
			const checkout = new Dibs.Checkout(this.dibsCheckoutOptions);
			
			checkout.on('payment-completed', (response) => {
				console.log('the payment is completed!', response);
			});
			
		}).catch((blApiErr: BlApiError) => {
			console.log('the api err', blApiErr);
		});
	}
}
