import {Component, Input, OnInit} from '@angular/core';
import {Delivery, Order} from "@wizardcoder/bl-model";
import {DeliveryService} from "@wizardcoder/bl-connect";

@Component({
	selector: 'app-order-delivery-info',
	templateUrl: './order-delivery-info.component.html',
	styleUrls: ['./order-delivery-info.component.scss']
})
export class OrderDeliveryInfoComponent implements OnInit {
	@Input() order: Order;
	public delivery: Delivery;

	constructor(private _deliveryService: DeliveryService) {
	}

	ngOnInit() {
		if (this.order && this.order.delivery) {
			this._deliveryService.getById(this.order.delivery).then((delivery: Delivery) => {
				this.delivery = delivery;
			}).catch((getDeliveryError) => {
				console.log('orderDeliveryInfoComponent: could not get delivery', getDeliveryError);
			});
		}
	}

}
