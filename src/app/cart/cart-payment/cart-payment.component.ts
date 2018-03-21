import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CartPaymentService} from "./cart-payment.service";
import {CartService} from "../cart.service";
import {BlApiError, Delivery, Order, Payment, PaymentMethod} from "bl-model";
import {OrderService, PaymentService} from 'bl-connect';
import {CartPaymentDibsComponent} from "./cart-payment-dibs/cart-payment-dibs.component";
import {Router} from "@angular/router";


@Component({
	selector: 'app-cart-payment',
	templateUrl: './cart-payment.component.html',
	styleUrls: ['./cart-payment.component.scss']
})
export class CartPaymentComponent implements OnInit {
	
	@Input() order: Order;
	public method: PaymentMethod;
	public payment: Payment;
	public delivery: Delivery;
	public showDibsPayment: boolean;
	@ViewChild(CartPaymentDibsComponent) cartPaymentDibsRef: CartPaymentDibsComponent;
	
	public paymentMethod: "branch" | "dibs";
	

	
	public showPayment: boolean;
	
	constructor(private _cartPaymentService: CartPaymentService, private _cartService: CartService, private _orderService: OrderService,
				private _paymentService: PaymentService, private _router: Router) {
		this.showPayment = false;
		this.paymentMethod = "dibs";
		this.showDibsPayment = false;
	
	}
	
	ngOnInit() {
		this.onPriceUpdate();
	}
	
	onPaymentMethodChange(paymentMethod: "branch" | "dibs") {
		this.paymentMethod = paymentMethod;
		console.log('the payment method', this.paymentMethod);
	}
	
	onPayLaterCofirm() {
		this.order.active = true;
		
		this._orderService.add(this.order).then((addedOrder: Order) => {
			console.log('the added order', addedOrder);
			this._cartService.emptyCart();
			this._router.navigateByUrl('/u/order');
		}).catch((blApiErr: BlApiError) => {
			console.log('error with adding the error', blApiErr);
		});
	}
	
	onDeliveryChange(delivery: Delivery) {
		console.log('we have the delivery in cartPayment', delivery);
		console.log('the order', this.order);
		
		if (this.delivery !== delivery) {
			if (this.cartPaymentDibsRef) {
				this.cartPaymentDibsRef.ngOnDestroy();
			}
			
			const orderData = {amount: this.order.amount + delivery.amount, delivery: delivery.id};
			
			this.delivery = delivery;
			
			console.log('the delivery is now', this.delivery);
			
			this.onPriceUpdate();
			
			this._orderService.update(this.order.id, orderData).then((order: Order) => {
				console.log('we got back the updated order', order);
			}).catch((blApiErr: BlApiError) => {
				console.log('blApierr', blApiErr);
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
