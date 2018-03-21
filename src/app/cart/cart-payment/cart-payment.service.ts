import {Injectable} from '@angular/core';
import {OrderService, PaymentService} from "bl-connect";
import {CartService} from "../cart.service";
import {BlApiError, Order, Payment, PaymentMethod} from "bl-model";

@Injectable()
export class CartPaymentService {
	
	order: Order;
	
	constructor(private _paymentService: PaymentService, private _cartService: CartService) {
	}
	
	getPayment(method: PaymentMethod): Promise<Payment> {
		return this._cartService.getOrder().then((order: Order) => {
			const payment = this.createPayment(method, order);
			
			return this._paymentService.add(payment).then((addedPayment: Payment) => {
				return addedPayment;
			}).catch((blApiErr: BlApiError) => {
				return Promise.reject(blApiErr);
			});
		});
	}
	
	
	private createPayment(method: PaymentMethod, order: Order): Payment {
		const payment: any = {
			method: method,
			order: order.id,
			info: {},
			amount: order.amount,
			confirmed: false,
			customer: order.customer,
			branch: order.branch
		};
		
		return payment;
	}
	
}
