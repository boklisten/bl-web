import {Injectable} from '@angular/core';
import {PaymentService} from "@wizardcoder/bl-connect";
import {BlApiError, Order, Payment, PaymentMethod, Delivery} from "@wizardcoder/bl-model";
import {Subject} from "rxjs/Subject";
import {CartOrderService} from "../order/cart-order.service";
import {BranchStoreService} from "../../branch/branch-store.service";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";

@Injectable()
export class CartPaymentService {
	public orderShouldHavePayment: boolean; // if false, no need to add or update the payment
	private _currentPayment: Payment;
	private paymentChange$: Subject<Payment>;
	private _paymentMethod: PaymentMethod;
	private _currentOrder: Order;
	private _currentDelivery: Delivery;

	constructor(private _paymentService: PaymentService, private _cartOrderService: CartOrderService,
				private _branchStoreService: BranchStoreService, private _cartDeliveryService: CartDeliveryService) {
		this.paymentChange$ = new Subject();

		const branch = this._branchStoreService.getBranch();

		if (branch) {
			if (branch.paymentInfo.responsible) { // no need to add payment if branch is responsible
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

	public changePaymentMethod(method: "dibs") {
		this._paymentMethod = method;
		const order = this._cartOrderService.getOrder();
		this.updatePayment(order);
	}

	private createPayment() {
		let payment: Payment;

		if (this._paymentMethod === 'dibs') {
			payment = this.createDibsPayment(this._currentOrder, this._currentDelivery);
		}

		this._paymentService.add(payment).then((addedPayment: Payment) => {
			this.setPayment(addedPayment);
		}).catch((blApiErr: BlApiError) => {
			console.log('paymentService: could not add payment');
		});

	}

	private updatePayment(order: Order, delivery?: Delivery) {
		if (!this._currentPayment) {
			return;
		}

		const paymentPatch = this.createDibsPayment(order, delivery);

		this._paymentService.update(this._currentPayment.id, paymentPatch).then((updatedPayment: Payment) => {
			this.setPayment(updatedPayment);
		}).catch((updatePaymentError) => {
			console.log('cartPaymentService: could not update payment', updatePaymentError);
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
