import {Component, Input, OnInit} from '@angular/core';
import {Order, Payment, Delivery, BlApiError, UserDetail} from '@wizardcoder/bl-model';
import {CartCheckoutService} from "./cart-checkout.service";
import {CartOrderService} from "../order/cart-order.service";
import {BranchStoreService} from "../../branch/branch-store.service";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";
import {CartPaymentService} from "../cart-payment/cart-payment.service";
import {Router} from "@angular/router";
import {UserService} from "../../user/user.service";
import {CartService} from "../cart.service";
import {UserEditService} from "../../user/user-edit/user-edit.service";

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
	public userEmailNotConfirmed: boolean;
	public userDetailValid: boolean;

	constructor(private _cartCheckoutService: CartCheckoutService, private _cartOrderService: CartOrderService,
				private _branchStoreService: BranchStoreService, private _cartDeliveryService: CartDeliveryService,
				private _cartPaymentService: CartPaymentService, private _router: Router, private _userService: UserService,
				private _cartService: CartService, private _userEditService: UserEditService) {

		this.orderPlacedFailure = false;
		this.userEmailNotConfirmed = false;
		this.userDetailValid = false;

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

		this._userService.getUserDetail().then((userDetail: UserDetail) => {
			if (!userDetail.emailConfirmed) {
				this.userEmailNotConfirmed = true;
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

			this.checkIfUserIsValid();

			this.onUserDetailUpdate();
		});
	}

	private onUserDetailUpdate() {
		this._userService.onUserDetailChange().subscribe(() => {
			this.checkIfUserIsValid();
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
			this.checkIfUserIsValid();
		} else if (decision === 'now') {
			this._cartOrderService.reloadOrder();
		}
	}

	public onEditUserDetailClick() {
		this._userEditService.redirectUrl = '/cart';
		this._router.navigateByUrl('/u/edit');
	}

	private checkIfUserIsValid() {
		this._userService.isUserDetailValid().then((valid: boolean) => {
			this.userDetailValid = valid;
		}).catch((userDetailValidError: BlApiError) => {
			console.log('userService: could not check if user detail is valid: ', userDetailValidError);
		});
	}

}
