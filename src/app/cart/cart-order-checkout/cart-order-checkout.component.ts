import { Component, OnInit } from "@angular/core";
import { Order, Delivery } from "@wizardcoder/bl-model";
import { CartOrderService } from "../cart-order/cart-order.service";
import { CartDeliveryService } from "../cart-delivery/cart-delivery.service";
import { BranchStoreService } from "../../branch/branch-store.service";
import { CartService } from "../cart.service";
import { CartStep } from "./cart-step";
import { CartOrderCheckoutService } from "./cart-order-checkout.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: "app-cart-order-checkout",
	templateUrl: "./cart-order-checkout.component.html",
	styleUrls: ["./cart-order-checkout.component.scss"]
})
export class CartOrderCheckoutComponent implements OnInit {
	private cartStep: CartStep;
	private steps: CartStep[];
	public stepCount: number;
	private progressParts: number;
	public progressWidth: number;
	public progressColor: "warning" | "info" | "success" | "danger";
	public order: Order;
	public init: boolean;
	public totalAmount: number;

	constructor(
		private cartOrderCheckoutService: CartOrderCheckoutService,
		private modalService: NgbModal
	) {}

	ngOnInit() {
		this.totalAmount = this.cartOrderCheckoutService.getTotalAmount();
		//this.onStepsChange();
		this.watchTotalAmount();
	}

	public watchTotalAmount() {
		this.cartOrderCheckoutService
			.onOrderAmountChange()
			.subscribe((amount: number) => {
				this.totalAmount = amount;
			});
	}

	public onOpenCheckout(content) {
		this.cartOrderCheckoutService
			.onStartCheckout()
			.then(() => {
				this.initSteps();
				this.modalService.open(content, { size: "lg" });
			})
			.catch(err => {
				console.log("COULD NOT START CHECKOUT", err);
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
		this.setProgress();
	}

	public onConfirmStep(stepType) {
		if (this.cartStep.type === stepType) {
			this.cartStep.confirmed = true;
			this.nextStep();
		}
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
		this.cartStep = this.steps[--this.stepCount];
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
