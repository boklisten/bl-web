import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Order } from "@boklisten/bl-model";
import { CartService } from "../cart.service";
import { CartStep } from "./cart-step";
import { CartOrderCheckoutService } from "./cart-order-checkout.service";
import { GoogleAnalyticsService } from "../../GoogleAnalytics/google-analytics.service";

@Component({
	selector: "app-cart-order-checkout",
	templateUrl: "./cart-order-checkout.component.html",
	styleUrls: ["./cart-order-checkout.component.scss"],
})
export class CartOrderCheckoutComponent implements OnInit {
	public cartStep: CartStep;
	public steps: CartStep[];
	public stepCount: number;
	public showProgressbar: boolean;
	private progressParts: number;
	public progressWidth: number;
	public progressColor: "warning" | "info" | "success" | "danger";
	public order: Order;
	public init: boolean;
	public totalAmount: number;
	public cartError: any;
	public wait: boolean;
	public paymentOption: "now" | "at-branch";
	public caller: string | null = null;

	constructor(
		private cartOrderCheckoutService: CartOrderCheckoutService,
		private router: Router,
		private route: ActivatedRoute,
		private cartService: CartService,
		private _googleAnalyticsService: GoogleAnalyticsService
	) {}

	ngOnInit() {
		if (this.cartService.getCart().length <= 0) {
			this.router.navigateByUrl("cart");
		}

		this.cartError = null;
		this.wait = true;
		this.showProgressbar = false;

		//this.totalAmount = this.cartOrderCheckoutService.getTotalAmount();
		//this.watchTotalAmount();

		this.cartOrderCheckoutService
			.onStartCheckout()
			.then(() => {
				this.initSteps();
				this.wait = false;
			})
			.catch((err) => {
				this.cartError = err;
				this.wait = false;
			});

		this.route.queryParams.subscribe(async (params) => {
			const paramCaller = params["caller"];
			if (paramCaller) {
				this.caller = paramCaller;
			}
		});
	}

	public watchTotalAmount() {
		this.cartOrderCheckoutService
			.onOrderAmountChange()
			.subscribe((amount: number) => {
				this.totalAmount = amount;
			});
	}

	public onPaymentError(error: Error) {
		this.cartError = { payment: true };
	}

	public onOpenCheckout(content) {
		this.cartOrderCheckoutService
			.onStartCheckout()
			.then(() => {
				this.initSteps();
			})
			.catch((err) => {
				this.cartError = err;
			});
	}

	private onStepsChange() {
		this.cartOrderCheckoutService.onCartStepsChange().subscribe(() => {
			this.initSteps();
		});
	}

	private initSteps() {
		this.stepCount = 0;
		this.steps = this.cartOrderCheckoutService.getCartSteps();
		this.cartStep = this.steps[this.stepCount];
		this.progressParts = 100 / (this.steps.length + 1);

		if (this.steps.length > 2) {
			this.showProgressbar = true;
		}

		this.setProgress();
	}

	public onConfirmStep(stepType, value?: boolean) {
		if (this.cartStep.type === stepType) {
			if (value !== undefined && !value) {
				this.cartStep.confirmed = false;
			} else {
				this.cartStep.confirmed = true;
				if (
					this.paymentOption === "at-branch" &&
					stepType === "payment-option"
				) {
					this.cartStep = { type: "checkout", confirmed: false };
					return;
				}
				this._googleAnalyticsService.eventEmitter(
					"checkout_progress",
					stepType,
					"completed_checkout_steps"
				);
				this.nextStep();
			}
		}
	}

	public onPaymentOptionChange(paymentOption: "now" | "at-branch") {
		this.paymentOption = paymentOption;
	}

	public isNextStepPossible() {
		return this.cartStep.confirmed;
	}

	public nextStep() {
		this.cartStep = this.steps[++this.stepCount];
		window.scroll(0, 0);
		this.setProgress();
	}

	public previousStep() {
		console.log("previous step");
		console.log("caller", this.caller);
		if (this.caller) {
			this.router.navigateByUrl(this.caller);
			return;
		}
		--this.stepCount;
		if (this.stepCount < 0) {
			this.router.navigateByUrl("/cart");
		}
		this.cartStep = this.steps[this.stepCount];
		window.scroll(0, 0);
		this.setProgress();
	}

	private setProgress() {
		this.progressWidth = (this.stepCount + 1) * this.progressParts;
		if (this.progressWidth < 50) {
			this.progressColor = "info";
		} else if (this.progressWidth >= 50 && this.progressWidth !== 100) {
			this.progressColor = "info";
		} else {
			this.progressColor = "success";
		}
	}
}
