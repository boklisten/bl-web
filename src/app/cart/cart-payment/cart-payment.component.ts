import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
	
	
	@ViewChild(CartPaymentDibsComponent) cartPaymentDibsRef: CartPaymentDibsComponent;
	public showDibsPayment: boolean;
	public paymentMethod: "later" | "dibs";
	public currentPayment: Payment;
	
	constructor(private _cartPaymentService: CartPaymentService, private _cartOrderService: CartOrderService) {
		this.paymentMethod = "dibs";
		this.showDibsPayment = false;
	}
	
	ngOnInit() {
		this._cartPaymentService.onPaymentChange().subscribe((payment: Payment) => {
			this.currentPayment = payment;
			
			if (this.currentPayment.method === 'dibs') {
				this.showDibsPayment = true;
			}
		});
	}
}
