import {Injectable} from '@angular/core';
import {CartService} from "../cart.service";
import {Order, BlApiError, Delivery, Payment} from 'bl-model';
import {OrderService} from 'bl-connect';
import {Subject} from "rxjs/Subject";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";
import {CartPaymentService} from "../cart-payment/cart-payment.service";
import {CartOrderService} from "../order/cart-order.service";

@Injectable()
export class CartCheckoutService {
	private currentDelivery: Delivery;
	private currentPayment: Payment;
	private currentOrder: Order;
	
	constructor(private _cartDeliveryService: CartDeliveryService, private _cartPaymentService: CartPaymentService,
				private _cartOrderService: CartOrderService, private _orderService: OrderService) {
		
		this.onDeliveryChange();
		this.onPaymentChange();
		this.onOrderChange();
	}
	
	public placeOrder(): Promise<Order> {
		return this._orderService.update(this.currentOrder.id, {placed: true}).then((placedOrder: Order) => {
			return placedOrder;
		}).catch((blApiError: BlApiError) => {
			return Promise.reject(blApiError);
		});
	}
	
	private onOrderChange() {
		this._cartOrderService.onOrderChange().subscribe((order: Order) => {
			console.log('cartCheckoutService: the order changed', order);
			this.currentOrder = order;
		});
	}
	
	private onDeliveryChange() {
		this._cartDeliveryService.onDeliveryChange().subscribe((delivery: Delivery) => {
			console.log('cartCheckoutService: the delivery changed', delivery);
			this.currentDelivery = delivery;
		});
	}
	
	private onPaymentChange() {
		this._cartPaymentService.onPaymentChange().subscribe((payment: Payment) => {
			console.log('cartCheckoutService: the payment changed', payment);
			this.currentPayment = payment;
		});
	}
}
