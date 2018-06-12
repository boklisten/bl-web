import {Component, Input, OnInit} from '@angular/core';
import {Order, Payment, Delivery, BlApiError} from '@wizardcoder/bl-model';
import {CartCheckoutService} from "./cart-checkout.service";
import {CartOrderService} from "../order/cart-order.service";
import {BranchStoreService} from "../../branch/branch-store.service";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";
import {CartPaymentService} from "../cart-payment/cart-payment.service";
import {Router} from "@angular/router";
import {UserService} from "../../user/user.service";
import {CartService} from "../cart.service";

@Component({
	selector: 'app-cart-checkout',
	templateUrl: './cart-checkout.component.html',
	styleUrls: ['./cart-checkout.component.scss']
})
export class CartCheckoutComponent implements OnInit {

	public paymentDecision: "now" | "later";
	public order: Order;
	showPaymentDecision: boolean;
	public showUserMustLogin: boolean;
	public orderPlacedFailure: boolean;
	public orderError: boolean;

	constructor(private _cartCheckoutService: CartCheckoutService, private _cartOrderService: CartOrderService,
				private _branchStoreService: BranchStoreService, private _cartDeliveryService: CartDeliveryService,
				private _cartPaymentService: CartPaymentService, private _router: Router, private _userService: UserService,
				private _cartService: CartService) {

		this.orderPlacedFailure = false;

		const branch = this._branchStoreService.getBranch();

		if (branch && branch.paymentInfo.responsible) {
			this._cartPaymentService.orderShouldHavePayment = false;
		} else {
			this._cartPaymentService.orderShouldHavePayment = true;
		}
	}

	ngOnInit() {
		if (!this._userService.loggedIn()) {
			this.showUserMustLogin = true;
			return;
		}

		const branch = this._branchStoreService.getBranch();

		if (branch && branch.paymentInfo.responsible) {
			this.showPaymentDecision = false;
		} else {
			this.paymentDecision = 'now';
			this.showPaymentDecision = true;
		}

		this.order = this._cartOrderService.getOrder();

		if (!this.order) {
			this.orderError = true;
		}

		this._cartOrderService.onOrderChange().subscribe((order: Order) => {
			this.orderError = false;
			this.order = order;
		});
	}


	public isOnlyCustomerItems() {
		for (const cartItem of this._cartService.getCart()) {
			if (!cartItem.customerItem) {
				return false;
			}
		}
		return true;
	}

	public getPrice(): number {
		if (!this.order) {
			return 0;
		}
		return this.order.amount;
	}


	public onConfirmOrder() {
		this._cartCheckoutService.placeOrder().then(() => {
			this._router.navigateByUrl('u/order');
		}).catch(() => {
			this.orderPlacedFailure = true;
		});
	}

	public onPaymentDecicionChange(decision: "now" | "later") {
		if (decision === 'later') {
			this._cartPaymentService.orderShouldHavePayment = false;

			this._cartDeliveryService.setBranchDelivery();
			this._cartOrderService.updateOrderWithNoPayments();
		} else if (decision === 'now') {
			this._cartPaymentService.changePaymentMethod('dibs');
		}
	}

}
