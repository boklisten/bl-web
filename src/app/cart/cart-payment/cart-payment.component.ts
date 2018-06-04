import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CartPaymentService} from "./cart-payment.service";
import {BlApiError, Delivery, Order, Payment, PaymentMethod} from "@wizardcoder/bl-model";
import {CartPaymentDibsComponent} from "./cart-payment-dibs/cart-payment-dibs.component";
import {CartOrderService} from "../order/cart-order.service";


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

	constructor(private _cartPaymentService: CartPaymentService, private _cartOrderService: CartOrderService) {
		this.paymentMethod = "dibs";
		this.showDibsPayment = false;
	}

	ngOnInit() {
		this.currentPayment = this._cartPaymentService.getPayment();

		if (this.currentPayment && this.currentPayment.method === 'dibs') {
			this.showDibsPayment = true;
		} else {
			this.removeDibsCheckout();
		}

		this._cartPaymentService.onPaymentChange().subscribe(() => {
			this.currentPayment = this._cartPaymentService.getPayment();
			this.removeDibsCheckout();
			if (this.currentPayment.method === 'dibs') {
				this.showDibsPayment = true;
			}
		});
	}

	private removeDibsCheckout() {
		this.dibsCheckoutChild = document.getElementById('dibs-checkout-content');

		if (this.dibsCheckoutChild) {
			this.dibsCheckoutChild.remove();
		}
	}
}
