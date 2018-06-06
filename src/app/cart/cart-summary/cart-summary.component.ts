import {Component, OnInit} from '@angular/core';
import {CartOrderService} from "../order/cart-order.service";
import {Delivery, Order} from "@wizardcoder/bl-model";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";

@Component({
	selector: 'app-cart-summary',
	templateUrl: './cart-summary.component.html',
	styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {
	public order: Order;
	public delivery: Delivery;

	constructor(private _cartOrderService: CartOrderService, private _cartDeliveryService: CartDeliveryService) {
	}

	ngOnInit() {
		this.order = this._cartOrderService.getOrder();
		this.delivery = this._cartDeliveryService.getDelivery();

		this._cartOrderService.onOrderChange().subscribe(() => {
			this.order = this._cartOrderService.getOrder();
		});

		this._cartDeliveryService.onDeliveryChange().subscribe(() => {
			this.delivery = this._cartDeliveryService.getDelivery();
		});

	}

	totalAmount(): number {
		if (this.delivery) {
			return this.delivery.amount + this.order.amount;
		}
		return this.order.amount;
	}

}
