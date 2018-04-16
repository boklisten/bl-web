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
	private dibsCheckoutParent: any;
	private dibsCheckoutChild: any;
	
	constructor(private _cartPaymentService: CartPaymentService, private _cartOrderService: CartOrderService) {
		this.paymentMethod = "dibs";
		this.showDibsPayment = false;
	}
	
	ngOnInit() {
		this.currentPayment = this._cartPaymentService.getPayment();
		
		this.dibsCheckoutChild = document.getElementById('dibs-checkout-content');
		
		this._cartPaymentService.onPaymentChange().subscribe((payment: Payment) => {
			this.dibsCheckoutChild = document.getElementById('dibs-checkout-content');
			
			if (this.dibsCheckoutChild) {
				this.dibsCheckoutChild.remove();
			}
			
			this.currentPayment = payment;
		
			if (this.currentPayment.method === 'dibs') {
				this.showDibsPayment = true;
			}
		});
	}
}
