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
	showPayment: boolean;

	constructor(private _paymentService: PaymentService) {
		this.payments = [];
		this.showPayment = true;
	}

	ngOnInit() {
		if (!this.order.payments || this.order.payments.length <= 0) {
			if (this.order.amount === 0) {
				this.showPayment = false;
			}
		}


		this._paymentService.getManyByIds(this.order.payments).then((payments: Payment[]) => {
			this.payments = payments;
		}).catch((getPaymentsError) => {
			console.log('orderPaymentInfoComponent: could not get payments from branch');
		});

	}

}
