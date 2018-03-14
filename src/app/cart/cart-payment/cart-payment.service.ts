import {Injectable} from '@angular/core';
import {OrderService, PaymentService} from "bl-connect";
import {CartService} from "../cart.service";
import {BlApiError, Order, Payment} from "bl-model";
import {PaymentMethod} from "bl-model/dist/payment/payment-method";

@Injectable()
export class CartPaymentService {
	
	order: Order;
	
	constructor(private _paymentService: PaymentService, private _cartService: CartService, private _orderService: OrderService) {
	}
	
	getPayment(method: PaymentMethod): Promise<Payment> {
		this.order = this._cartService.createOrder();
		
		return new Promise((resolve, reject) => {
			console.log('the order to add:', this.order);
			return this._orderService.add(this.order).then((addedOrder: Order) => {
				this.order = addedOrder;
				return this.createPayment(method, addedOrder);
			}).then((payment: Payment) => {
				return this._paymentService.add(payment);
			}).then((addedPayment: Payment) => {
				resolve(addedPayment);
			}).catch((blApiErr: BlApiError) => {
				reject(blApiErr);
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
