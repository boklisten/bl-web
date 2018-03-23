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
	
	constructor(private _cartPaymentService: CartPaymentService, private _cartService: CartService, private _orderService: OrderService,
				private _paymentService: PaymentService, private _router: Router, private _cartDeliveryService: CartDeliveryService) {
		
		
		this.showPayment = false;
		this.paymentMethod = "dibs";
		this.showDibsPayment = false;
		this.paymentUpdate = new EventEmitter();
	
	}
	
	ngOnInit() {
	}
	
	onDibsPaymentUpdate(payment: Payment) {
		console.log('we got a updated payment from dibs component', this.payment);
		this.paymentUpdate.emit(payment);
	}

	
	onPayLaterConfirm() {
	
	}
	
	
	onDeliveryChange(delivery: Delivery) {
		if (this.delivery !== delivery) {
			if (this.cartPaymentDibsRef) {
				this.cartPaymentDibsRef.ngOnDestroy();
			}
			
			const orderData = {amount: this.order.amount + delivery.amount, delivery: delivery.id};
			
			this.delivery = delivery;
			
			
			this.onPriceUpdate();
			
			this._orderService.getById(this.order.id).then((order: Order) => {
				this.order = order;
				console.log('we got back the updated order', order);
			}).catch((blApiErr: BlApiError) => {
				console.log('cartPaymentComponent: could not get order by id', blApiErr);
			});
		}
	}
	
	getTotalPrice(): number {
		if (!this.delivery) {
			return this.order.amount;
		}
		return this.order.amount + this.delivery.amount;
	}
	
	onPriceUpdate() {
		this.showDibsPayment = true;
	}
	
	
	
	
	
}
