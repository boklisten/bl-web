import { Injectable } from "@angular/core";
import { PaymentService } from "@wizardcoder/bl-connect";
import {
	BlApiError,
	Order,
	Payment,
	PaymentMethod,
	Delivery
} from "@wizardcoder/bl-model";
import { Subject } from "rxjs";
import { CartOrderService } from "../cart-order/cart-order.service";
import { BranchStoreService } from "../../branch/branch-store.service";
import { CartDeliveryService } from "../cart-delivery/cart-delivery.service";
import { CartService } from "../cart.service";

@Injectable()
export class CartPaymentService {
	public orderShouldHavePayment: boolean; // if false, no need to add or update the payment
	private _currentPayment: Payment;
	private paymentChange$: Subject<Payment>;
	private _paymentMethod: PaymentMethod;
	private _currentOrder: Order;
	private _currentDelivery: Delivery;

	constructor(
		private _paymentService: PaymentService,
		private _cartOrderService: CartOrderService,
		private _cartService: CartService,
		private _branchStoreService: BranchStoreService,
		private _cartDeliveryService: CartDeliveryService
	) {
		this.paymentChange$ = new Subject();
	}

	public onPaymentChange() {
		return this.paymentChange$;
	}

	public async getOrderIdByPaymentId(paymentId: string): Promise<string> {
		let payments;

		try {
			payments = await this._paymentService.get({
				query: "?info.paymentId=" + paymentId
			});
		} catch (e) {
			console.log("could not get payment by paymentId", paymentId, e);
		}

		return payments[0].order;
	}

	public clear() {
		this._currentPayment = null;
		this._currentOrder = null;
		this._currentDelivery = null;
	}

	private onDeliveryChange() {
		this._cartDeliveryService
			.onDeliveryChange()
			.subscribe((delivery: Delivery) => {
				this._currentOrder = this._cartOrderService.getOrder();
				this._currentDelivery = delivery;
				this.createPayment()
					.then(payment => {
						this.setPayment(payment);
					})
					.catch(() => {});
			});
	}

	public createPayment(): Promise<Payment> {
		return new Promise((resolve, reject) => {
			let payment: Payment = null;

			try {
				payment = this.createDibsPayment(
					this._cartOrderService.getOrder(),
					this._cartDeliveryService.getDelivery()
				);
			} catch (e) {
				reject(e);
			}

			if (!this.isPaymentChanged(payment)) {
				return resolve(payment);
			}

			this._paymentService
				.add(payment)
				.then((addedPayment: Payment) => {
					this.setPayment(addedPayment);
					resolve(addedPayment);
				})
				.catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
		});
	}

	private isPaymentChanged(payment: Payment): boolean {
		if (this._currentPayment) {
			if (payment.amount == this._currentPayment.amount) {
				if (payment.order == this._currentPayment.order) {
					return false;
				}
			}
		}
		return true;
	}

	private setPayment(payment: Payment) {
		this._currentPayment = payment;
		this.paymentChange$.next(payment);
	}

	public getPayment() {
		return this._currentPayment;
	}

	private createDibsPayment(order: Order, delivery?: Delivery): Payment {
		return {
			method: "dibs",
			order: order.id,
			amount: this.calculatePaymentAmount(order, delivery),
			info: {},
			taxAmount: this.calculateTaxAmount(order, delivery),
			customer: order.customer,
			branch: order.branch
		} as Payment;
	}

	private calculatePaymentAmount(order: Order, delivery?: Delivery): number {
		if (!delivery) {
			return order.amount;
		}
		return order.amount + delivery.amount;
	}

	private calculateTaxAmount(order: Order, delivery?: Delivery): number {
		let taxAmount = 0;

		for (const orderItem of order.orderItems) {
			taxAmount += orderItem.taxAmount;
		}

		if (delivery && delivery.taxAmount) {
			return taxAmount + delivery.taxAmount;
		}

		return taxAmount;
	}
}
