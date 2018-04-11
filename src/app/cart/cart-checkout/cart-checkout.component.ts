import {Component, Input, OnInit} from '@angular/core';
import {Order, Payment, Delivery, BlApiError} from '@wizardcoder/bl-model';
import {CartCheckoutService} from "./cart-checkout.service";
import {CartOrderService} from "../order/cart-order.service";
import {BranchStoreService} from "../../branch/branch-store.service";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";
import {CartPaymentService} from "../cart-payment/cart-payment.service";
import {Router} from "@angular/router";
import {UserService} from "../../user/user.service";

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
	
	constructor(private _cartCheckoutService: CartCheckoutService, private _cartOrderService: CartOrderService,
				private _branchStoreService: BranchStoreService, private _cartDeliveryService: CartDeliveryService,
				private _cartPaymentService: CartPaymentService, private _router: Router, private _userService: UserService) {
	}
	
	ngOnInit() {
		
		if (!this._userService.loggedIn()) {
			this.showUserMustLogin = true;
			return;
		}
		
		const branch = this._branchStoreService.getBranch();
		
		if (branch.paymentInfo.responsible) {
			this.paymentDecision = 'later';
			this.showPaymentDecision = false;
		} else {
			this.paymentDecision = 'now';
			this.showPaymentDecision = true;
		}
		
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
		if (!this._userService.loggedIn()) {
			this._router.navigateByUrl('auth/menu');
			return;
		}
		
		this._cartCheckoutService.placeOrder().then((placedOrder: Order) => {
			this._router.navigateByUrl('u/order');
		});
	}
	
	public onConfirmOrderBranchResponsible() {
		if (!this._userService.loggedIn()) {
			this._router.navigateByUrl('auth/menu');
			return;
		}
		
		this._cartPaymentService.changePaymentMethod(this._cartOrderService.getOrder(), 'later').then((payment: Payment) => {
			this._cartCheckoutService.placeOrder().then((placedOrder: Order) => {
				this._router.navigateByUrl('u/order');
			}).catch((placeOrderError) => {
				console.log('cartCheckoutComponent: could not place order', placeOrderError);
			});
		}).catch((blApiError: BlApiError) => {
			console.log('cartCheckoutComponent: failed to update paymentMethod onConfirmOrderBranchResponsible');
		});
	}
	
	public onPaymentDecicionChange(decision: "now" | "later") {
		if (decision === 'later') {
			this._cartDeliveryService.updateDeliveryBranch().then((updatedDelivery: Delivery) => {
				this._cartPaymentService.changePaymentMethod(this._cartOrderService.getOrder(), 'later').then((payment: Payment) => {
				
				}).catch((blApiError: BlApiError) => {
					console.log('cartCheckoutComponent: failed to update payment', blApiError);
				});
			}).catch((blApiErr: BlApiError) => {
				console.log('cartCheckoutComponent: failed to update delivery to branch');
			});
		}
		
	}
	
}
