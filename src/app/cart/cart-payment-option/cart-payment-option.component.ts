import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { BranchStoreService } from "../../branch/branch-store.service";
import { Branch } from "@boklisten/bl-model";
import { CartDeliveryService } from "../cart-delivery/cart-delivery.service";

@Component({
	selector: "app-cart-payment-option",
	templateUrl: "./cart-payment-option.component.html",
	styleUrls: ["./cart-payment-option.component.scss"],
})
export class CartPaymentOptionComponent implements OnInit {
	selectedPaymentOption: "now" | "at-branch";
	@Output() paymentOption: EventEmitter<"now" | "at-branch">;
	@Output() paymentOptionConfirmed: EventEmitter<boolean>;
	branch: Branch;
	public atBranchOptionValid: boolean;

	constructor(
		private _branchStoreService: BranchStoreService,
		private _cartDeliveryService: CartDeliveryService
	) {
		this.paymentOption = new EventEmitter();
		this.paymentOptionConfirmed = new EventEmitter();
	}

	ngOnInit() {
		this.selectedPaymentOption = "now";
		this.branch = this._branchStoreService.getBranch();
		this.paymentOption.emit(this.selectedPaymentOption);
		const delivery = this._cartDeliveryService.getDelivery();

		if (delivery.method !== "branch") {
			this.atBranchOptionValid = false;
		} else {
			this.atBranchOptionValid = true;
		}
	}

	public onSetPaymentOption(option: "now" | "at-branch") {
		this.selectedPaymentOption = option;
		this.paymentOption.emit(option);
	}

	public onConfirmPaymentOption() {
		this.paymentOptionConfirmed.emit(true);
	}
}
