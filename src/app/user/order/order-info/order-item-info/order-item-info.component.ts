import {Component, Input, OnInit} from '@angular/core';
import {OrderItem, CustomerItem, BlApiError} from '@wizardcoder/bl-model';
import {CustomerItemService} from '@wizardcoder/bl-connect';

@Component({
	selector: 'app-order-item-info',
	templateUrl: './order-item-info.component.html',
	styleUrls: ['./order-item-info.component.scss']
})
export class OrderItemInfoComponent implements OnInit {
	@Input() orderItem: OrderItem;
	public customerItem: CustomerItem;

	constructor(private _customerItemService: CustomerItemService) {
	}

	ngOnInit() {
		if (this.orderItem && this.orderItem.type === 'rent' && this.orderItem.info.customerItem) {
			this._customerItemService.getById(this.orderItem.info.customerItem).then((customerItem: CustomerItem) => {
				this.customerItem = customerItem;
			}).catch((customerItemError: BlApiError) => {
				console.log('orderITemInfoComponent: error when trying to get orderItem', customerItemError);
			});
		}
	}
}
