import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CartOrderService } from "../cart-order/cart-order.service";

@Component({
	selector: "app-cart-agreement",
	templateUrl: "./cart-agreement.component.html",
	styleUrls: ["./cart-agreement.component.scss"],
})
export class CartAgreementComponent implements OnInit {
	@Input() confirmed: boolean;
	@Output() confirmedChange: EventEmitter<boolean>;
	showAgreement: boolean;

	constructor(private _cartOrderService: CartOrderService) {
		this.confirmedChange = new EventEmitter<boolean>();
		this.showAgreement = false;
	}

	ngOnInit() {}

	onConfirmClick() {
		window.scroll(0, 0);
		this.confirmed = true;
		this.confirmedChange.emit(true);
	}

	onShowAgreement() {
		this.showAgreement = !this.showAgreement;
	}
}
