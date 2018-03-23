import {Injectable} from '@angular/core';
import {OrderService, PaymentService} from "bl-connect";
import {CartService} from "../cart.service";
import {BlApiError, Order, Payment, PaymentMethod, Delivery} from "bl-model";

@Injectable()
export class CartPaymentService {
	
	private currentPayment: Payment;
	
	constructor(private _paymentService: PaymentService, private _cartService: CartService) {
	}
	
	public clearPayment() {
		this.currentPayment = null;
	}
	
	public payLater(order: Order): Promise<Payment> {
		const laterPayment = {
			method: 'later',
			order: order.id,
			info: {},
			taxAmount: this.getOrderTaxAmount(order),
			customer: order.customer,
			branch: order.branch
		};
		
		return this.updateOrSetPayment(laterPayment);
	}
	
	public payDibs(order: Order): Promise<Payment> {
		
		const dibsPayment = {
			method: 'dibs',
			order: order.id,
			info: {},
			taxAmount: this.getOrderTaxAmount(order),
			customer: order.customer,
			branch: order.branch
		};
		
		return this.updateOrSetPayment(dibsPayment);
	}
	
	private getOrderTaxAmount(order: Order): number {
		let taxAmount = 0;
		
		for (const orderItem of order.orderItems) {
			taxAmount += orderItem.taxAmount;
		}
		
		return taxAmount;
	}
	
	private updateOrSetPayment(data: any): Promise<Payment> {
		return new Promise((resolve, reject) => {
			if (this.currentPayment) {
				this._paymentService.update(this.currentPayment.id, data).then((updatedPayment: Payment) => {
					this.currentPayment = updatedPayment;
					resolve(updatedPayment);
				}).catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
			} else {
				this._paymentService.add(data).then((addedPayment: Payment) => {
					this.currentPayment = addedPayment;
					resolve(this.currentPayment);
				}).catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
			}
		});
	}
}
