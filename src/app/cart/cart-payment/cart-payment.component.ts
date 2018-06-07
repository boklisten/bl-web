import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CartPaymentService} from "./cart-payment.service";
import {BlApiError, Delivery, Order, Payment, PaymentMethod} from "@wizardcoder/bl-model";
import {CartPaymentDibsComponent} from "./cart-payment-dibs/cart-payment-dibs.component";
import {CartOrderService} from "../order/cart-order.service";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";


@Component({
	selector: 'app-cart-payment',
	templateUrl: './cart-payment.component.html',
	styleUrls: ['./cart-payment.component.scss']
})
export class CartPaymentComponent implements OnInit {


	public showDibsPayment: boolean;
	public paymentMethod: "later" | "dibs";
	public currentPayment: Payment;
	private dibsCheckoutChild: any;
	public failure: boolean;

	constructor(private _cartPaymentService: CartPaymentService, private _cartOrderService: CartOrderService, private _cartDeliveryService: CartDeliveryService) {
		this.paymentMethod = "dibs";
		this.showDibsPayment = false;
		this.failure = false;
	}

	ngOnInit() {
		this.currentPayment = this._cartPaymentService.getPayment();

		if (this.currentPayment && this.currentPayment.method === 'dibs') {
			this.showDibsPayment = true;
		} else {
			this.removeDibsCheckout();
		}

		this._cartPaymentService.onPaymentChange().subscribe(() => {
			this.failure = false;
			this.currentPayment = this._cartPaymentService.getPayment();
			this.removeDibsCheckout();
			if (this.currentPayment.method === 'dibs') {
				this.showDibsPayment = true;
			}
		});

		this._cartDeliveryService.onDeliveryFailure().subscribe(() => {
			this.removeDibsCheckout();
			this.failure = true;
		});
	}

	private removeDibsCheckout() {
		this.dibsCheckoutChild = document.getElementById('dibs-checkout-content');

		if (this.dibsCheckoutChild) {
			this.dibsCheckoutChild.remove();
		}
	}
}
