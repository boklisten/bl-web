import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlApiError, Delivery, Order, DeliveryMethod} from "@wizardcoder/bl-model";
import {DateService} from "../../date/date.service";
import {DeliveryService} from '@wizardcoder/bl-connect';
import {BranchStoreService} from "../../branch/branch-store.service";
import {CartDeliveryService} from "./cart-delivery.service";
import {CartCheckoutService} from "../cart-checkout/cart-checkout.service";
import {CartService} from "../cart.service";
import {CartOrderService} from "../order/cart-order.service";

@Component({
	selector: 'app-cart-delivery',
	templateUrl: './cart-delivery.component.html',
	styleUrls: ['./cart-delivery.component.scss']
})
export class CartDeliveryComponent implements OnInit {
	
	@Output() delivery: EventEmitter<Delivery>;
	
	public deliveryMethod: DeliveryMethod;
	public currentDelivery: Delivery;
	public toPostalCode: string;
	
	
	constructor(private _dateService: DateService, private _cartDeliveryService: CartDeliveryService,
				private _cartCheckoutService: CartCheckoutService, private _cartService: CartService, private _cartOrderService: CartOrderService) {
		
		this.deliveryMethod = 'branch';
		this.delivery = new EventEmitter();
		this.toPostalCode = "7070";
		this.currentDelivery = this._cartDeliveryService.getDelivery();
		
		if (this.currentDelivery) {
			this.deliveryMethod = this.currentDelivery.method;
		}
	}
	
	ngOnInit() {
		this.currentDelivery = this._cartDeliveryService.getDelivery();
		if (this.currentDelivery) {
			this.deliveryMethod = this.currentDelivery.method;
		}
		this._cartDeliveryService.onDeliveryChange().subscribe((delivery: Delivery) => {
			this.currentDelivery = this._cartDeliveryService.getDelivery();
			this.deliveryMethod = this.currentDelivery.method;
		});
	}
	
	private updateDeliveryBring(toPostal: string) {
		this._cartDeliveryService.updateDeliveryBring(toPostal).then((updatedDelivery: Delivery) => {
			this.currentDelivery = updatedDelivery;
			this.deliveryMethod = updatedDelivery.method;
		}).catch((blApiErr: BlApiError) => {
			console.log('cartDeliveryComponent: failed to update delivery type branch');
		});
	}
	
	private updateDeliveryBranch() {
		this._cartDeliveryService.updateDeliveryBranch().then((updatedDelivery: Delivery) => {
			this.deliveryMethod = updatedDelivery.method;
			this.currentDelivery = updatedDelivery;
			
		}).catch((blApiErr: BlApiError) => {
			console.log('cartDeliveryComponent: failed to update delivery type branch');
		});
	}
	
	onDeliveryClick(deliveryMethod: DeliveryMethod) {
		this.deliveryMethod = deliveryMethod;
		
		if (!this.currentDelivery) {
			this.currentDelivery = this._cartDeliveryService.getDelivery();
		}
		
		switch (deliveryMethod) {
			case "bring":
				this.updateDeliveryBring(this.toPostalCode);
				break;
			case "branch":
				this.updateDeliveryBranch();
				break;
		}
	}
	
	public getEstimatedDelivery(): string {
		if (!this.currentDelivery) {
			return '';
		}
		return this._dateService.daysUntil(this.currentDelivery.info['estimatedDelivery']);
	}
}
