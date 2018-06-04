import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlApiError, Delivery, Order, DeliveryMethod, UserDetail} from "@wizardcoder/bl-model";
import {DateService} from "../../date/date.service";
import {DeliveryService} from '@wizardcoder/bl-connect';
import {BranchStoreService} from "../../branch/branch-store.service";
import {CartDeliveryService} from "./cart-delivery.service";
import {CartCheckoutService} from "../cart-checkout/cart-checkout.service";
import {CartService} from "../cart.service";
import {CartOrderService} from "../order/cart-order.service";
import {isNumber} from "util";
import {UserService} from "../../user/user.service";

@Component({
	selector: 'app-cart-delivery',
	templateUrl: './cart-delivery.component.html',
	styleUrls: ['./cart-delivery.component.scss']
})
export class CartDeliveryComponent implements OnInit {

	@Output() delivery: EventEmitter<Delivery>;

	public deliveryMethod: DeliveryMethod;
	public currentDelivery: Delivery;

	public toPostalCode: number;
	public toName: string;
	public toAddress: string;
	public toPostalCity: string;

	public postalCodeFailure: boolean;
	public postalCodeFailureText: string;


	constructor(private _dateService: DateService, private _cartDeliveryService: CartDeliveryService, private _userService: UserService) {

		this.deliveryMethod = 'branch';
		this.delivery = new EventEmitter();
		this.postalCodeFailure = true;
		this.toPostalCode = 0;
		this.postalCodeFailureText = null;
		this.currentDelivery = this._cartDeliveryService.getDelivery();

		if (this.currentDelivery) {
			this.deliveryMethod = this.currentDelivery.method;
		}

		this._userService.getUserDetail().then((userDetail: UserDetail) => {
			if (userDetail.postCode) {
				this.toPostalCode = parseInt(userDetail.postCode, 10);
			}
		}).catch((getUserDetailError) => {
			console.log('cartDeliveryService: could not get user detail');
		});
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

	onSetDelivery(deliveryMethod: DeliveryMethod) {
		this.deliveryMethod = deliveryMethod;

		if (!this.currentDelivery) {
			this.currentDelivery = this._cartDeliveryService.getDelivery();
		}

		switch (deliveryMethod) {
			case "bring":
				this.setDeliveryBring();
				break;
			case "branch":
				this.setDeliveryBranch();
				break;
		}
	}

	private setDeliveryBranch() {
		this._cartDeliveryService.setBranchDelivery();
	}

	private setDeliveryBring() {
		if (isNumber(this.toPostalCode) && this.toPostalCode.toString().length === 4) {
			this.postalCodeFailureText = null;
			this._cartDeliveryService.setBringDelivery(this.toName, this.toAddress, this.toPostalCity, this.toPostalCode.toString());
		} else {
			this.postalCodeFailureText = 'please provide a valid postal code';
		}
	}

	public getEstimatedDelivery(): string {
		if (!this.currentDelivery) {
			return '';
		}
		return this._dateService.daysUntil(this.currentDelivery.info['estimatedDelivery']);
	}
}
