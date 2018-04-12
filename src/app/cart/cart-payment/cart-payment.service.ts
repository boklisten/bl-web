import {Injectable} from '@angular/core';
import {OrderService, PaymentService} from "@wizardcoder/bl-connect";
import {CartService} from "../cart.service";
import {BlApiError, Order, Payment, PaymentMethod, Delivery} from "@wizardcoder/bl-model";
import {Subject} from "rxjs/Subject";
import {CartCheckoutService} from "../cart-checkout/cart-checkout.service";
import {CartOrderService} from "../order/cart-order.service";
import {BranchStoreService} from "../../branch/branch-store.service";

@Injectable()
export class CartPaymentService {
	
	private _currentPayment: Payment;
	private paymentChange$: Subject<Payment>;
	private _paymentMethod: PaymentMethod;
	
	constructor(private _paymentService: PaymentService, private _cartOrderService: CartOrderService,
				private _branchService: BranchStoreService) {
		this.paymentChange$ = new Subject();
		
		const branch = this._branchService.getBranch();
		
		if (branch) {
			if (branch.paymentInfo.responsible) {
				this._paymentMethod = 'later';
			} else {
				this._paymentMethod = 'dibs';
			}
		}
		
		
		const initialOrder = this._cartOrderService.getOrder();
		
		if (initialOrder) {
			this.createPayment(initialOrder);
		}
		
		this._cartOrderService.onOrderChange().subscribe((order: Order) => {
			if (!this._currentPayment) {
				this.createPayment(order);
			} else {
				this.updatePayment(order);
			}
		});
		
		this._cartOrderService.onClearOrder().subscribe(() => {
			this._currentPayment = null;
		});
	}
	
	public onPaymentChange() {
		return this.paymentChange$;
	}
	
	public changePaymentMethod(method: "dibs" | "later") {
		this._paymentMethod = method;
		const order = this._cartOrderService.getOrder();
		this.updatePayment(order);
	}
	
	private createPayment(order: Order) {
		let payment: Payment;
		
		if (this._paymentMethod === 'later') {
			payment = this.createLaterPayment(order);
		} else if (this._paymentMethod === 'dibs') {
			payment = this.createDibsPayment(order);
		}
		
		this._paymentService.add(payment).then((addedPayment: Payment) => {
			this.setPayment(addedPayment);
		}).catch((blApiErr: BlApiError) => {
			console.log('paymentService: could not add payment');
		});
	
	}
	
	private updatePayment(order: Order) {
		if (!this._currentPayment) {
			return;
		}
		
		let paymentPatch: any;
		
		if (this._paymentMethod === 'later') {
			paymentPatch = this.createLaterPayment(order);
		} else {
			paymentPatch = this.createDibsPayment(order);
		}
		
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

	public clearPayment() {
		this._currentPayment = null;
	}
	
	public getPayment() {
		return this._currentPayment;
	}
	
	private createDibsPayment(order: Order): Payment {
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
	
	private createLaterPayment(order: Order): Payment {
		return {
			method: 'later',
			order: order.id,
			amount: order.amount,
			info: {
				branch: order.branch
			},
			taxAmount: this.getOrderTaxAmount(order),
			customer: order.customer,
			branch: order.branch
		} as any;
	}
	
	private getOrderTaxAmount(order: Order): number {
		let taxAmount = 0;
		
		for (const orderItem of order.orderItems) {
			taxAmount += orderItem.taxAmount;
		}
		
		return taxAmount;
	}
}
