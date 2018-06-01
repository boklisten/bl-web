import {Component, Input, OnInit} from '@angular/core';
import {PaymentService} from "@wizardcoder/bl-connect";
import {Order, Payment} from "@wizardcoder/bl-model";

@Component({
	selector: 'app-order-payment-info',
	templateUrl: './order-payment-info.component.html',
	styleUrls: ['./order-payment-info.component.scss']
})
export class OrderPaymentInfoComponent implements OnInit {
	@Input() order: Order;
	payments: Payment[];

	constructor(private _paymentService: PaymentService) {
		this.payments = [];
	}

	ngOnInit() {
		console.log('the order, has no payments?', this.order.payments);
		this._paymentService.getManyByIds(this.order.payments).then((payments: Payment[]) => {
			this.payments = payments;
		}).catch((getPaymentsError) => {
			console.log('orderPaymentInfoComponent: could not get payments from branch');
		});
	}

}
