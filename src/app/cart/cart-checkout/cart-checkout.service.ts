import {Injectable} from '@angular/core';
import {CartService} from "../cart.service";
import {Order, BlApiError, Delivery, Payment} from '@wizardcoder/bl-model';
import {OrderService} from '@wizardcoder/bl-connect';
import {Subject} from "rxjs/Subject";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";
import {CartPaymentService} from "../cart-payment/cart-payment.service";
import {CartOrderService} from "../order/cart-order.service";
import {UserService} from "../../user/user.service";
import {Router} from "@angular/router";

@Injectable()
export class CartCheckoutService {
	private currentDelivery: Delivery;
	private currentPayment: Payment;
	private currentOrder: Order;

	constructor(private _cartDeliveryService: CartDeliveryService, private _cartPaymentService: CartPaymentService,
				private _cartOrderService: CartOrderService, private _orderService: OrderService, private _cartService: CartService,
				private _router: Router, private _userService: UserService) {
	}

	public placeOrder(): Promise<boolean> {
		if (!this._userService.loggedIn()) {
			this._router.navigateByUrl('auth/menu');
			return Promise.reject(new Error('the user is not logged in when trying to place order'));
		}

		const order = this._cartOrderService.getOrder();

		return new Promise((resolve, reject) => {

			this._orderService.update(order.id, {placed: true}).then((placedOrder: Order) => {
				// we need to clear everything after order is placed
				this._cartService.clearCart();
				this._cartOrderService.clearOrder();

				resolve(true);
			}).catch((blApiError: BlApiError) => {
				reject(new Error('order could not be placed: ' + blApiError));
			});
		});
	}
}
