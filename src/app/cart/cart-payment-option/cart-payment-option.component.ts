import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { BranchStoreService } from "../../branch/branch-store.service";
import { Branch } from "@wizardcoder/bl-model";

@Component({
	selector: "app-cart-payment-option",
	templateUrl: "./cart-payment-option.component.html",
	styleUrls: ["./cart-payment-option.component.scss"]
})
export class CartPaymentOptionComponent implements OnInit {
	selectedPaymentOption: "now" | "at-branch";
	@Output() paymentOption: EventEmitter<"now" | "at-branch">;
	@Output() paymentOptionConfirmed: EventEmitter<boolean>;
	branch: Branch;

	constructor(private _branchStoreService: BranchStoreService) {
		this.paymentOption = new EventEmitter();
		this.paymentOptionConfirmed = new EventEmitter();
	}

	ngOnInit() {
		this.selectedPaymentOption = "now";
		this.branch = this._branchStoreService.getBranch();
		this.paymentOption.emit(this.selectedPaymentOption);
	}

	public onSetPaymentOption(option: "now" | "at-branch") {
		this.selectedPaymentOption = option;
		this.paymentOption.emit(option);
	}

	public onConfirmPaymentOption() {
		this.paymentOptionConfirmed.emit(true);
	}
}
