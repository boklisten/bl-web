import { Injectable } from "@angular/core";
import { PaymentService } from "@wizardcoder/bl-connect";
import { CartCheckoutService } from "../cart-checkout/cart-checkout.service";
import { CartPaymentService } from "../cart-payment/cart-payment.service";
import { Order } from "@wizardcoder/bl-model";

@Injectable({
	providedIn: "root"
})
export class CartConfirmService {
	constructor(
		private _paymentService: PaymentService,
		private _cartCheckoutService: CartCheckoutService,
		private _cartPaymentService: CartPaymentService
	) {}

	public getOrderIdByPaymentId(paymentId: string): Promise<string> {
		return this._cartPaymentService.getOrderIdByPaymentId(paymentId);
	}

	public async confirm(orderId: string): Promise<boolean> {
		try {
			await this._cartCheckoutService.placeOrder(orderId);
		} catch (e) {
			throw e;
		}

		return true;
	}
}
