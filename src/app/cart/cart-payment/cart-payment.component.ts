import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CartPaymentService} from "./cart-payment.service";
import {CartService} from "../cart.service";
import {BlApiError, Delivery, Order, Payment, PaymentMethod} from "bl-model";
import {OrderService, PaymentService} from 'bl-connect';
import {CartPaymentDibsComponent} from "./cart-payment-dibs/cart-payment-dibs.component";
import {Router} from "@angular/router";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";
import {CartOrderService} from "../order/cart-order.service";


@Component({
	selector: 'app-cart-payment',
	templateUrl: './cart-payment.component.html',
	styleUrls: ['./cart-payment.component.scss']
})
export class CartPaymentComponent implements OnInit {
	
	
	@ViewChild(CartPaymentDibsComponent) cartPaymentDibsRef: CartPaymentDibsComponent;
	public payment: Payment;
	public showDibsPayment: boolean;
	public paymentMethod: "later" | "dibs";
	public currentOrder: Order;
	
	constructor(private _cartPaymentService: CartPaymentService, private _cartOrderService: CartOrderService) {
		this.paymentMethod = "dibs";
		this.showDibsPayment = false;
		
		this._cartOrderService.onOrderChange().subscribe(() => {
			this.currentOrder = this._cartOrderService.getOrder();
		});
	}
	
	ngOnInit() {
	}
	
	onPayLaterConfirm() {
	
	}
	
	getTotalPrice(): number {
		if (!this.currentOrder) {
			return -1;
		}
		return this.currentOrder.amount;
	}
}
