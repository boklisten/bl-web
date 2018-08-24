import {Injectable} from '@angular/core';
import {PaymentService} from "@wizardcoder/bl-connect";
import {BlApiError, Order, Payment, PaymentMethod, Delivery} from "@wizardcoder/bl-model";
import {Subject} from "rxjs";
import {CartOrderService} from "../cart-order/cart-order.service";
import {BranchStoreService} from "../../branch/branch-store.service";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";
import {CartService} from "../cart.service";

@Injectable()
export class CartPaymentService {
	public orderShouldHavePayment: boolean; // if false, no need to add or update the payment
	private _currentPayment: Payment;
	private paymentChange$: Subject<Payment>;
	private _paymentMethod: PaymentMethod;
	private _currentOrder: Order;
	private _currentDelivery: Delivery;

	constructor(private _paymentService: PaymentService,
				private _cartOrderService: CartOrderService,
				private _cartService: CartService,
				private _branchStoreService: BranchStoreService,
				private _cartDeliveryService: CartDeliveryService) {
		this.paymentChange$ = new Subject();

		const branch = this._branchStoreService.getBranch();

		if (branch) {
			if (branch.paymentInfo.responsible && !this._cartService.shouldPay()) { // no need to add payment if branch is responsible
				return;
			} else {
				this._paymentMethod = 'dibs';
			}
		}

		this._cartOrderService.onClearOrder().subscribe(() => {
			this._currentPayment = null;
		});

		if (this._cartDeliveryService.getDelivery()) {
			this.createPayment();
		}

		this._cartDeliveryService.onDeliveryChange().subscribe((delivery: Delivery) => {
			this._currentOrder = this._cartOrderService.getOrder();
			this._currentDelivery = delivery;

			if (this.orderShouldHavePayment) {
				this.createPayment();
			}
		});
	}

	public onPaymentChange() {
		return this.paymentChange$;
	}

	public clear() {
		this._currentPayment = null;
		this._currentOrder = null;
		this._currentDelivery = null;
	}


	private createPayment() {
		let payment: Payment;

		if (this._paymentMethod === 'dibs') {
			payment = this.createDibsPayment(this._cartOrderService.getOrder(), this._cartDeliveryService.getDelivery());
		} else {
			return;
		}

		this._paymentService.add(payment).then((addedPayment: Payment) => {
			this.setPayment(addedPayment);
		}).catch((blApiErr: BlApiError) => {
			console.log('paymentService: could not add payment');
		});

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
			method: 'dibs',
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
