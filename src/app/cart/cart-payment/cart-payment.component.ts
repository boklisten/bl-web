import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {CartPaymentService} from "./cart-payment.service";
import {Payment } from "@wizardcoder/bl-model";
import {CartOrderService} from "../cart-order/cart-order.service";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";
import {Observable} from "rxjs/internal/Observable";
import {Subscription} from "rxjs/internal/Subscription";


@Component({
	selector: 'app-cart-payment',
	templateUrl: './cart-payment.component.html',
	styleUrls: ['./cart-payment.component.scss']
})
export class CartPaymentComponent implements OnInit, OnDestroy {


	public showDibsPayment: boolean;
	public paymentMethod: "later" | "dibs";
	public currentPayment: Payment;
	private dibsCheckoutChild: any;
	public failure: boolean;
	private paymentChange$: Subscription;

	constructor(private _cartPaymentService: CartPaymentService, private _cartOrderService: CartOrderService,
				private _cartDeliveryService: CartDeliveryService) {
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


		this.paymentChange$ = this._cartPaymentService.onPaymentChange().subscribe(() => {
			this.failure = false;
			this.currentPayment = this._cartPaymentService.getPayment();
			if (this.currentPayment.method === 'dibs') {
				this.showDibsPayment = true;
			}
		});

		this._cartDeliveryService.onDeliveryFailure().subscribe(() => {
			this.failure = true;
		});
	}

	ngOnDestroy() {
		this.paymentChange$.unsubscribe();
		this.removeDibsCheckout();
	}

	private removeDibsCheckout() {
		this.dibsCheckoutChild = document.getElementById('dibs-checkout-content');

		if (this.dibsCheckoutChild) {
			this.dibsCheckoutChild.remove();
		}
	}
}
