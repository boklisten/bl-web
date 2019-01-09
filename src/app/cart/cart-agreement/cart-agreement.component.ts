import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
	selector: "app-cart-agreement",
	templateUrl: "./cart-agreement.component.html",
	styleUrls: ["./cart-agreement.component.scss"]
})
export class CartAgreementComponent implements OnInit {
	@Input() confirmed: boolean;
	@Output() confirmedChange: EventEmitter<boolean>;
	showAgreement: boolean;

	constructor() {
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
