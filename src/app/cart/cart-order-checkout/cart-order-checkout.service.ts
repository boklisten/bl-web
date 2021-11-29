import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { CartOrderService } from "../cart-order/cart-order.service";
import { CartDeliveryService } from "../cart-delivery/cart-delivery.service";
import { CartService } from "../cart.service";
import { BranchStoreService } from "../../branch/branch-store.service";
import { CartStep } from "./cart-step";
import { GoogleAnalyticsService } from "../../GoogleAnalytics/google-analytics.service";

@Injectable({
	providedIn: "root",
})
export class CartOrderCheckoutService {
	private cartSteps: CartStep[];
	private oldCartSteps: CartStep[];
	private cartStepsChange$: Subject<boolean>;
	private orderAmountChangge$: Subject<number>;
	private cartAmount: number;
	private deliveryAmount: number;

	constructor(
		private cartOrderService: CartOrderService,
		private cartDeliveryService: CartDeliveryService,
		private cartService: CartService,
		private branchStoreService: BranchStoreService,
		private _googleAnalyticsService: GoogleAnalyticsService
	) {
		this.cartSteps = [];
		this.cartStepsChange$ = new Subject();
		this.orderAmountChangge$ = new Subject();
		this.oldCartSteps = [];
		this.cartAmount = 0;
		this.deliveryAmount = 0;
	}

	public onOrderAmountChange(): Observable<number> {
		return this.orderAmountChangge$.asObservable();
	}

	public getTotalAmount() {
		return (
			this.cartService.getTotalPrice() +
			this.cartDeliveryService.getDeliveryAmount()
		);
	}

	private watchTotalAmount() {
		this.cartService.onCartChange().subscribe(() => {
			this.cartAmount = this.cartService.getTotalPrice();
			this.orderAmountChangge$.next(
				this.cartAmount + this.deliveryAmount
			);
		});

		this.cartDeliveryService.onDeliveryChange().subscribe(() => {
			this.deliveryAmount = this.cartDeliveryService.getDeliveryAmount();
			this.orderAmountChangge$.next(
				this.cartAmount + this.deliveryAmount
			);
		});
	}

	public onStartCheckout(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.cartOrderService
				.onStartCheckout()
				.then(() => {
					this._googleAnalyticsService.eventEmitter(
						"begin_checkout",
						"Go to checkout"
					);
					this.cartSteps = this.calculateCartSteps();
					resolve(true);
				})
				.catch((startCheckoutError) => {
					reject(startCheckoutError);
				});
		});
	}

	public getCartSteps() {
		return this.cartSteps;
	}

	public onCartStepsChange() {
		return this.cartStepsChange$.asObservable();
	}

	private onOrderChange() {
		this.cartOrderService.onOrderChange().subscribe(() => {
			this.cartSteps = this.calculateCartSteps();
			this.cartStepsChange$.next(true);
		});
	}

	public calculateCartSteps(): CartStep[] {
		let steps: CartStep[] = [];

		if (this.needToConfirmAgreement()) {
			steps.push({
				type: "agreement",
				confirmed: false,
			});
		}

		if (this.showDeliveryOption()) {
			steps.push({
				type: "delivery",
				confirmed: false,
			});
		}

		if (this.showPaymentOption()) {
			steps.push({ type: "payment-option", confirmed: false });
		}

		if (this.needToPay()) {
			steps.push({
				type: "payment",
				confirmed: false,
			});
		} else {
			steps.push({
				type: "checkout",
				confirmed: false,
			});
		}
		return steps;
	}

	private showSummary() {
		return true;
	}

	private needToConfirmAgreement(): boolean {
		if (this.cartService.isOnlyCustomerItems()) {
			return false;
		}

		if (
			this.cartOrderService.doesOrderIncludeRent() ||
			this.cartOrderService.doesOrderIncludePartlyPayment()
		) {
			return true;
		}

		return true;
	}

	private showPaymentOption(): boolean {
		if (this.needToPay()) {
			const branch = this.branchStoreService.getBranch();
			if (
				branch.paymentInfo.payLater &&
				!this.cartOrderService.doesOrderIncludeBuyout() &&
				!this.cartOrderService.doesOrderIncludeExtend()
			) {
				return true;
			}
		}
		return false;
	}

	private showPartlyPaymentInfo(): boolean {
		return this.cartOrderService.doesOrderIncludePartlyPayment();
	}

	private showDeliveryOption(): boolean {
		if (this.needToPay()) {
			if (
				this.cartOrderService.doesOrderIncludeRent() ||
				this.cartOrderService.doesOrderIncludeBuy() ||
				this.cartOrderService.doesOrderIncludePartlyPayment()
			) {
				return true;
			}
		}
		return false;
	}

	private needToPay(): boolean {
		const branchIsResponsible = this.branchStoreService.getBranch()
			?.paymentInfo.responsible;

		return (
			this.cartOrderService.doesOrderIncludeBuy() ||
			this.cartOrderService.doesOrderIncludeBuyout() ||
			this.cartOrderService.doesOrderIncludeExtend() ||
			!branchIsResponsible
		);
	}
}
