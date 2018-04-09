import {Component, Input, OnInit} from '@angular/core';
import {Order, Payment, Delivery, BlApiError} from '@wizardcoder/bl-model';
import {CartCheckoutService} from "./cart-checkout.service";
import {CartOrderService} from "../order/cart-order.service";
import {BranchStoreService} from "../../branch/branch-store.service";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";
import {CartPaymentService} from "../cart-payment/cart-payment.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-cart-checkout',
	templateUrl: './cart-checkout.component.html',
	styleUrls: ['./cart-checkout.component.scss']
})
export class CartCheckoutComponent implements OnInit {
	
	public paymentDecision: "now" | "later";
	public order: Order;
	showPaymentDecision: boolean;
	
	constructor(private _cartCheckoutService: CartCheckoutService, private _cartOrderService: CartOrderService,
				private _branchStoreService: BranchStoreService, private _cartDeliveryService: CartDeliveryService,
				private _cartPaymentService: CartPaymentService, private _router: Router) {
	}
	
	ngOnInit() {
		// if branch is responsible the payment decision should be 'later'
		const branch = this._branchStoreService.getBranch();
		
		if (branch.paymentInfo.responsible) {
			this.paymentDecision = 'later';
			this.showPaymentDecision = false;
		} else {
			this.paymentDecision = 'now';
			this.showPaymentDecision = true;
		}
		
		this.order = this._cartOrderService.getOrder();
		
		this._cartOrderService.onOrderChange().subscribe(() => {
			this.order = this._cartOrderService.getOrder();
		});
		
	}

	
	public getPrice(): number {
		if (!this.order) {
			return 0;
		}
		return this.order.amount;
	}
	
	public onConfirmOrder() {
		this._cartCheckoutService.placeOrder().then((placedOrder: Order) => {
			
			this._router.navigateByUrl('u/order');
		});
	}
	
	public onPaymentDecicionChange(decision: "now" | "later") {
		if (decision === 'later') {
			this._cartDeliveryService.updateDeliveryBranch().then((updatedDelivery: Delivery) => {
				this._cartPaymentService.changePaymentMethod(this._cartOrderService.getOrder(), 'later').then((payment: Payment) => {
					console.log('changed the payment to "later"', payment);
					console.log('updated delivery to branch', updatedDelivery);
				}).catch((blApiError: BlApiError) => {
					console.log('cartCheckoutComponent: failed to update payment', blApiError);
				});
			}).catch((blApiErr: BlApiError) => {
				console.log('cartCheckoutComponent: failed to update delivery to branch');
			});
		}
		
	}
	
}
