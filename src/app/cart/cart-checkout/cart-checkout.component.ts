import {Component, Input, OnInit} from '@angular/core';
import {Order, Payment, Delivery, BlApiError, UserDetail, Branch} from '@wizardcoder/bl-model';
import {CartCheckoutService} from "./cart-checkout.service";
import {CartOrderService} from "../cart-order/cart-order.service";
import {BranchStoreService} from "../../branch/branch-store.service";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";
import {CartPaymentService} from "../cart-payment/cart-payment.service";
import {Router} from "@angular/router";
import {UserService} from "../../user/user.service";
import {CartService} from "../cart.service";
import {UserEditService} from "../../user/user-edit/user-edit.service";
import {AuthLoginService} from "@wizardcoder/bl-login";

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
	public agreementConfirmed: boolean;
	public branch: Branch;

	constructor(private _cartCheckoutService: CartCheckoutService, private _cartOrderService: CartOrderService,
				private _branchStoreService: BranchStoreService, private _cartDeliveryService: CartDeliveryService,
				private _cartPaymentService: CartPaymentService, private _router: Router, private _userService: UserService,
				private _cartService: CartService, private _userEditService: UserEditService,
				private _authLoginService: AuthLoginService) {

		this.orderPlacedFailure = false;
		this.userEmailNotConfirmed = false;
		this.userDetailValid = false;

	}

	ngOnInit() {
		this.branch = this._branchStoreService.getBranch();
		this.agreementConfirmed = this._cartCheckoutService.agreementConfirmed;

		this._cartPaymentService.orderShouldHavePayment = !(this.branch && this.branch.paymentInfo.responsible);

		if (!this._userService.loggedIn()) {
			this.showUserMustLogin = true;
			return;
		}

		this.branch = this._branchStoreService.getBranch();

		if (this.branch && this.branch.paymentInfo.responsible) {
			this.showPaymentDecision = false;
		} else {
			this.paymentDecision = this._cartCheckoutService.paymentDecision;
			this.showPaymentDecision = true;
		}

		this._userService.getUserDetail().then((userDetail: UserDetail) => {
			if (!userDetail.emailConfirmed) {
				this.userEmailNotConfirmed = true;
				return;
			}

			this.checkIfUserIsValid();
		});

		this.onUserDetailUpdate();

		this.order = this._cartOrderService.getOrder();

		if (!this.order) {
			this.orderError = true;
		}

		this._cartOrderService.onOrderChange().subscribe((order: Order) => {
			this.orderError = false;
			this.order = order;
		});
	}

	public onConfirmAgreement(agreed: boolean) {
		this._cartCheckoutService.agreementConfirmed = agreed;
		this.agreementConfirmed = this._cartCheckoutService.agreementConfirmed;
	}

	private onUserDetailUpdate() {
		this._userService.onUserDetailChange().subscribe(() => {
			this.checkIfUserIsValid();
		});
	}


	public isOnlyCustomerItems(): boolean {
		for (const cartItem of this._cartService.getCart()) {
			if (!cartItem.customerItem) {
				return false;
			}
		}
		return true;
	}

	public needToConfirmAgreement(): boolean {
		if (this.isOnlyCustomerItems()) {
			return false;
		}

		if (!this._cartOrderService.doesOrderIncludeType('rent')) {
			return false;
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

	public goToLogin() {
		this._authLoginService.redirectUrl = '/cart';
		this._router.navigateByUrl('/auth/login');
	}

	public goToRegister() {
		this._authLoginService.redirectUrl = '/cart';
		this._router.navigateByUrl('/auth/register');
	}

	public onPaymentDecicionChange(decision: "now" | "later") {
		this.paymentDecision = decision;
		this._cartCheckoutService.paymentDecision = this.paymentDecision;

		if (this.paymentDecision === 'later') {
			this._cartPaymentService.clear();
			this._cartPaymentService.orderShouldHavePayment = false;

			this._cartDeliveryService.setBranchDelivery();
			this._cartOrderService.reloadOrder();

			this.checkIfUserIsValid();
		} else if (this.paymentDecision === 'now') {
			this.paymentDecision = 'now';
			this._cartPaymentService.clear();
			this._cartPaymentService.orderShouldHavePayment = true;

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
