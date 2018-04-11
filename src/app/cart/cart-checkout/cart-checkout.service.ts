import {Injectable} from '@angular/core';
import {CartService} from "../cart.service";
import {Order, BlApiError, Delivery, Payment} from '@wizardcoder/bl-model';
import {OrderService} from '@wizardcoder/bl-connect';
import {Subject} from "rxjs/Subject";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";
import {CartPaymentService} from "../cart-payment/cart-payment.service";
import {CartOrderService} from "../order/cart-order.service";
import {UserService} from "../../user/user.service";

@Injectable()
export class CartCheckoutService {
	private currentDelivery: Delivery;
	private currentPayment: Payment;
	private currentOrder: Order;
	
	constructor(private _cartDeliveryService: CartDeliveryService, private _cartPaymentService: CartPaymentService,
				private _cartOrderService: CartOrderService, private _orderService: OrderService, private _cartService: CartService) {
		
		this.onDeliveryChange();
		this.onPaymentChange();
		this.onOrderChange();
	}
	
	public placeOrder(): Promise<Order> {
		return this._orderService.update(this.currentOrder.id, {placed: true}).then((placedOrder: Order) => {
			// we need to clear everything after order is placed
			
			this._cartOrderService.clearOrder();
			this._cartPaymentService.clearPayment();
			this._cartDeliveryService.clearDelivery();
			this._cartService.clearCart();
			
			return placedOrder;
		}).catch((blApiError: BlApiError) => {
			return Promise.reject(blApiError);
		});
	}
	
	private onOrderChange() {
		this._cartOrderService.onOrderChange().subscribe((order: Order) => {
			this.currentOrder = order;
		});
	}
	
	private onDeliveryChange() {
		this._cartDeliveryService.onDeliveryChange().subscribe((delivery: Delivery) => {
			this.currentDelivery = delivery;
		});
	}
	
	private onPaymentChange() {
		this._cartPaymentService.onPaymentChange().subscribe((payment: Payment) => {
			this.currentPayment = payment;
		});
	}
}
