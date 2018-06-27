import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
	selector: 'app-cart-agreement',
	templateUrl: './cart-agreement.component.html',
	styleUrls: ['./cart-agreement.component.scss']
})
export class CartAgreementComponent implements OnInit {
	@Input() confirmed: boolean;
	@Output() confirmedChange: EventEmitter<boolean>;

	constructor() {
		this.confirmedChange = new EventEmitter<boolean>();
	}

	ngOnInit() {
	}

	onConfirmClick() {
		window.scroll(0, 0);
		this.confirmed = true;
		this.confirmedChange.emit(true);
	}

}
