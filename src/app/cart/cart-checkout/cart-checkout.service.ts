import { Injectable } from "@angular/core";
import { CartService } from "../cart.service";
import { Order, BlApiError } from "@boklisten/bl-model";
import { OrderService } from "@boklisten/bl-connect";
import { CartDeliveryService } from "../cart-delivery/cart-delivery.service";
import { CartPaymentService } from "../cart-payment/cart-payment.service";
import { CartOrderService } from "../cart-order/cart-order.service";
import { UserService } from "../../user/user.service";
import { Router } from "@angular/router";
import { GoogleAnalyticsService } from "../../GoogleAnalytics/google-analytics.service";

@Injectable()
export class CartCheckoutService {
	public agreementConfirmed: boolean;
	public paymentDecision: "now" | "later";

	constructor(
		private _cartDeliveryService: CartDeliveryService,
		private _cartPaymentService: CartPaymentService,
		private _cartOrderService: CartOrderService,
		private _orderService: OrderService,
		private _cartService: CartService,
		private _router: Router,
		private _userService: UserService,
		private _googleAnalyticsService: GoogleAnalyticsService
	) {
		this.agreementConfirmed = false;

		this.paymentDecision = "now"; // default

		this._cartService.onCartChange().subscribe(() => {
			if (this._cartService.getSize() <= 0) {
				this.agreementConfirmed = false;
				this.paymentDecision = "now";
			}
		});
	}

	public placeOrder(orderId?: string): Promise<boolean> {
		if (!this._userService.loggedIn()) {
			this._router.navigateByUrl("auth/menu");
			return Promise.reject(
				new Error(
					"the user is not logged in when trying to place order"
				)
			);
		}

		let updateOrderId = "";

		if (orderId) {
			updateOrderId = orderId;
		} else {
			const order = this._cartOrderService.getOrder();
			updateOrderId = order.id;
		}

		return new Promise((resolve, reject) => {
			this._orderService
				.updateWithOperation(updateOrderId, {}, "confirm")
				//.update(updateOrderId, { placed: true })
				.then(() => {
					this._googleAnalyticsService.eventEmitter(
						"purchase",
						"Purchase complete",
						"ecommerce",
						"(not set)",
						this._cartService.getTotalPrice()
					);
					this._cartService.clearCart();
					this._cartOrderService.clearOrder();
					this._userService.reloadUserDetail();

					resolve(true);
				})
				.catch((e) => {
					console.log("could not confirm order", e);

					reject(new Error("order could not be placed: " + e));
				});
		});
	}
}
