import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CartPaymentService} from "./cart-payment.service";
import {CartService} from "../cart.service";
import {BlApiError, Delivery, Order, Payment, PaymentMethod} from "bl-model";
import {OrderService, PaymentService} from 'bl-connect';
import {CartPaymentDibsComponent} from "./cart-payment-dibs/cart-payment-dibs.component";
import {Router} from "@angular/router";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";


@Component({
	selector: 'app-cart-payment',
	templateUrl: './cart-payment.component.html',
	styleUrls: ['./cart-payment.component.scss']
})
export class CartPaymentComponent implements OnInit {
	
	@Input() order: Order;
	@Output() paymentUpdate: EventEmitter<Payment>;
	
	public method: PaymentMethod;
	public payment: Payment;
	public delivery: Delivery;
	public showDibsPayment: boolean;
	@ViewChild(CartPaymentDibsComponent) cartPaymentDibsRef: CartPaymentDibsComponent;
	
	public paymentMethod: "later" | "dibs";
	

	
	public showPayment: boolean;
	
	constructor(private _cartPaymentService: CartPaymentService) {
		
		this.showPayment = false;
		this.paymentMethod = "dibs";
		this.showDibsPayment = false;
		this.paymentUpdate = new EventEmitter();
	}
	
	ngOnInit() {
	}
	
	onPayLaterConfirm() {
	
	}
	
	getTotalPrice(): number {
		if (!this.delivery) {
			return this.order.amount;
		}
		return this.order.amount + this.delivery.amount;
	}
}
