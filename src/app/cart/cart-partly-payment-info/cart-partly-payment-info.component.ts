import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
	selector: "app-cart-partly-payment-info",
	templateUrl: "./cart-partly-payment-info.component.html",
	styleUrls: ["./cart-partly-payment-info.component.scss"]
})
export class CartPartlyPaymentInfoComponent implements OnInit {
	@Output() confirm: EventEmitter<boolean>;

	constructor() {
		this.confirm = new EventEmitter<boolean>();
	}

	ngOnInit() {}

	onConfirm() {
		this.confirm.emit(true);
	}
}
