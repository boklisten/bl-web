import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CartPaymentService} from "./cart-payment.service";
import {CartService} from "../cart.service";
import {PaymentMethod} from "bl-model/dist/payment/payment-method/payment-method";
import {BlApiError, Delivery, Order, Payment} from "bl-model";
import {OrderService} from 'bl-connect';
import {CartPaymentDibsComponent} from "./cart-payment-dibs/cart-payment-dibs.component";


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
	
	public paymentMethod: "dibs" | "stand";
	

	
	public showPayment: boolean;
	
	constructor(private _cartPaymentService: CartPaymentService, private _cartService: CartService, private _orderService: OrderService) {
		this.showPayment = false;
		this.paymentMethod = "dibs";
		this.showDibsPayment = false;
	
	}
	
	ngOnInit() {
		this.onPriceUpdate();
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
