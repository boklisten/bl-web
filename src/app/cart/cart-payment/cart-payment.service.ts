import {Injectable} from '@angular/core';
import {OrderService, PaymentService} from "@wizardcoder/bl-connect";
import {CartService} from "../cart.service";
import {BlApiError, Order, Payment, PaymentMethod, Delivery} from "@wizardcoder/bl-model";
import {Subject} from "rxjs/Subject";
import {CartCheckoutService} from "../cart-checkout/cart-checkout.service";
import {CartOrderService} from "../order/cart-order.service";

@Injectable()
export class CartPaymentService {
	
	private currentPayment: Payment;
	private paymentChange$: Subject<Payment>;
	
	constructor(private _paymentService: PaymentService, private _cartOrderService: CartOrderService) {
		// this.paymentChange$ = new Subject();
	}
	
	public onPaymentChange() {
		return this.paymentChange$;
	}
	
	public changePaymentMethod(order: Order, method: "dibs" | "later"): Promise<Payment> {
		switch (method) {
			case "dibs":
				return this.updateOrSetPayment(this.updateDibsPayment(order));
			case "later":
				return this.updateOrSetPayment(this.updateLaterPayment(order));
		}
	}
	
	public clearPayment() {
		this.currentPayment = null;
	}
	
	public getPayment() {
		return this.currentPayment;
	}
	
	private updateDibsPayment(order: Order): Payment {
		return {
			method: 'dibs',
			order: order.id,
			amount: order.amount,
			info: {},
			taxAmount: this.getOrderTaxAmount(order),
			customer: order.customer,
			branch: order.branch
		} as Payment;
	}
	
	private updateLaterPayment(order: Order): Payment {
		return {
			id: '',
			method: 'later',
			order: order.id,
			amount: order.amount,
			info: {
				branch: order.branch
			},
			taxAmount: this.getOrderTaxAmount(order),
			customer: order.customer,
			branch: order.branch
		};
	}
	private updateOrSetPayment(payment: Payment): Promise<Payment> {
		return new Promise((resolve, reject) => {
			if (this.currentPayment) {
				this._paymentService.update(this.currentPayment.id, payment).then((updatedPayment: Payment) => {
					this.currentPayment = updatedPayment;
					this.paymentChange$.next(this.currentPayment);
					resolve(updatedPayment);
				}).catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
			} else {
				this._paymentService.add(payment).then((addedPayment: Payment) => {
					this.currentPayment = addedPayment;
					this.paymentChange$.next(this.currentPayment);
					resolve(this.currentPayment);
				}).catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
			}
		});
	}
	
	
	private getOrderTaxAmount(order: Order): number {
		let taxAmount = 0;
		
		for (const orderItem of order.orderItems) {
			taxAmount += orderItem.taxAmount;
		}
		
		return taxAmount;
	}
}
