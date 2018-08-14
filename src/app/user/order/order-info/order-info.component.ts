import {Component, Input, OnInit} from '@angular/core';
import {Order} from "@wizardcoder/bl-model";

@Component({
	selector: 'app-order-info',
	templateUrl: './order-info.component.html',
	styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {
	@Input() order: Order;

	showDelivery: boolean;

	constructor() {
	}

	ngOnInit() {
		this.showDelivery = this.shouldShowDelivery();
	}

	shouldShowDelivery() {
		console.log('order handoutByDelivery', this.order.handoutByDelivery);

		if (this.order.handoutByDelivery) {
			return true;
		}

		for (const orderItem of this.order.orderItems) {
			if (orderItem.type !== 'buyout' && orderItem.type !== 'return' && orderItem.type !== 'extend') {
				return true;
			}
		}

		return false;
	}



}
