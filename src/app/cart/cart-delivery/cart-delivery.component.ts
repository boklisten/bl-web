import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlApiError, Delivery, Order, DeliveryMethod} from "bl-model";
import {DateService} from "../../date/date.service";
import {DeliveryService} from 'bl-connect';
import {BranchStoreService} from "../../branch/branch-store.service";
import {CartDeliveryService} from "./cart-delivery.service";
import {CartCheckoutService} from "../cart-checkout/cart-checkout.service";

@Component({
	selector: 'app-cart-delivery',
	templateUrl: './cart-delivery.component.html',
	styleUrls: ['./cart-delivery.component.scss']
})
export class CartDeliveryComponent implements OnInit {
	
	
	@Output() delivery: EventEmitter<Delivery>;
	
	public deliveryMethod: DeliveryMethod;
	public currentDelivery: Delivery;
	private order: Order;
	public toPostalCode: string;
	
	
	constructor(private _dateService: DateService, private _cartDeliveryService: CartDeliveryService,
				private _cartCheckoutService: CartCheckoutService) {
		
		this.deliveryMethod = 'branch';
		this.delivery = new EventEmitter();
		this.toPostalCode = "7070";
	}
	
	ngOnInit() {
		this.order = this._cartCheckoutService.getOrder();
		
		
		if (this.order) {
			this.addOrUpdateDelivery();
		}
		
		this._cartCheckoutService.onOrderChange().subscribe((order: Order) => {
			this.order = order;
			this.addOrUpdateDelivery();
		});
	}
	
	addOrUpdateDelivery() {
		if (this.deliveryMethod === 'branch') {
			this.updateDeliveryBranch();
		} else if (this.deliveryMethod === 'bring') {
			this.updateDeliveryBring(this.toPostalCode);
		}
	}
	
	private updateDeliveryBring(toPostal: string) {
		this._cartDeliveryService.updateDeliveryBring(this.order, toPostal).then((updatedDelivery: Delivery) => {
			this.updateDelivery(updatedDelivery);
		}).catch((blApiErr: BlApiError) => {
			console.log('cartDeliveryComponent: failed to update delivery type branch');
		});
	}
	
	private updateDeliveryBranch() {
		this._cartDeliveryService.updateDeliveryBranch(this.order).then((updatedDelivery: Delivery) => {
			this.updateDelivery(updatedDelivery);
		}).catch((blApiErr: BlApiError) => {
			console.log('cartDeliveryComponent: failed to update delivery type branch');
		});
	}
	
	private updateDelivery(updatedDelivery: Delivery) {
		this.currentDelivery = updatedDelivery;
	}
	
	onDeliveryClick(deliveryMethod: DeliveryMethod) {
		this.deliveryMethod = deliveryMethod;
		
		if (!this.currentDelivery) {
			return;
		}
		
		if (this.currentDelivery.id) {
			switch (deliveryMethod) {
				case "bring":
					this.updateDeliveryBring(this.toPostalCode);
					break;
				case "branch":
					this.updateDeliveryBranch();
					break;
			}
		}
	}
	
	public getEstimatedDelivery(): string {
		if (!this.currentDelivery) {
			return '';
		}
		return this._dateService.daysUntil(this.currentDelivery.info['estimatedDelivery']);
	}
}
