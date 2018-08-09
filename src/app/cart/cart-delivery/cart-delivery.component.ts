import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {BlApiError, Delivery, Order, DeliveryMethod, UserDetail, Branch} from "@wizardcoder/bl-model";
import {DateService} from "../../date/date.service";
import {DeliveryService} from '@wizardcoder/bl-connect';
import {BranchStoreService} from "../../branch/branch-store.service";
import {CartDeliveryService} from "./cart-delivery.service";
import {CartCheckoutService} from "../cart-checkout/cart-checkout.service";
import {CartService} from "../cart.service";
import {CartOrderService} from "../cart-order/cart-order.service";
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
	public mailOption: boolean;
	public branchOption: boolean;
	public deliveryError: boolean;

	public toPostalCode: string;
	public toName: string;
	public toAddress: string;
	public toPostalCity: string;
	public failureText: string;
	public bringInputWarning: string;
	public branch: Branch;
	public showConfirmShipmentButton: boolean;

	constructor(private _dateService: DateService, private _cartDeliveryService: CartDeliveryService, private _userService: UserService,
				private _branchStoreService: BranchStoreService) {

		this.delivery = new EventEmitter();
		this.bringInputWarning = '';
		this.failureText = null;
	}

	ngOnInit() {
		this.branch = this._branchStoreService.getBranch();
		this.deliveryMethod = this._cartDeliveryService.getDefaultDeliveryMethod();
		this.setDeliveryOptions();
		this.setDefaultDeliveryMethod();

		this.currentDelivery = this._cartDeliveryService.getDelivery();
		this.setDeliveryDetails();
		this.onDeliveryFailure();
		this.onSetDelivery(this.deliveryMethod);

		this._cartDeliveryService.onDeliveryChange().subscribe((delivery: Delivery) => {
			this.failureText = null;
			this.bringInputWarning = '';
			this.currentDelivery = this._cartDeliveryService.getDelivery();
			this.deliveryMethod = this.currentDelivery.method;
		});
	}

	private setDeliveryOptions() {
		if (this.branch.deliveryMethods) {
			this.branchOption = this.branch.deliveryMethods.branch;
			this.mailOption = this.branch.deliveryMethods.byMail;

			if (this.branchOption === undefined || this.mailOption === undefined) {
				this.branchOption = true;
				this.mailOption = true;
			}
		} else {
			this.branchOption = true;
			this.mailOption = true;
		}

	}

	public setDefaultDeliveryMethod() {
		if (this.branchOption) {
			this.deliveryMethod = 'branch';
		} else if (this.mailOption) {
			this.deliveryMethod = 'bring';
		} else {
			this.deliveryMethod = 'branch';
		}
	}

	private setDeliveryDetails() {
		this._userService.getUserDetail().then((userDetail: UserDetail) => {
			this.toName = (userDetail.name) ? userDetail.name : '';
			this.toAddress = (userDetail.address) ? userDetail.address : '';
			this.toPostalCity = (userDetail.postCity) ? userDetail.postCity : '';
			this.toPostalCode = (userDetail.postCode) ? userDetail.postCode : '';
			this.validateDeliveryMethodBring();
			this.onSetDelivery(this.deliveryMethod);
		}).catch((getUserDetailError) => {
			console.log('cartDeliveryService: could not get user detail');
		});
	}


	onInputEnterClick() {
		if (this.validateDeliveryMethodBring()) {
			this.onSetDelivery(this.deliveryMethod);
		}
	}

	public validateInput() {
		if (!this.validateDeliveryMethodBring()) {
			this._cartDeliveryService.setDeliveryFailure();
			this.showConfirmShipmentButton = true;
			return false;
		}
		return true;
	}

	validateDeliveryMethodBring(): boolean {
		this.bringInputWarning = '';
		this.deliveryError = false;

		if (!this.toName || this.toName.length <= 0) {
			this.bringInputWarning = 'invalid-name';
			return false;
		}

		if (!this.toAddress || this.toAddress.length <= 0) {
			this.bringInputWarning = 'invalid-address';
			return false;
		}

		if (!this.toPostalCity || this.toPostalCity.length <= 0) {
			this.bringInputWarning = 'invalid-postal-city';
			return false;
		}

		if (!this.toPostalCode || this.toPostalCode.length < 4) {
			this.bringInputWarning = 'invalid-postal-code';
			return false;
		}

		this.bringInputWarning = '';
		return true;
	}

	onSetDelivery(deliveryMethod: DeliveryMethod) {
		this.deliveryMethod = deliveryMethod;
		this.showConfirmShipmentButton = false;

		switch (this.deliveryMethod) {
			case "bring":
				this.setDeliveryBring();
				break;
			case "branch":
				this.setDeliveryBranch();
				break;
		}
	}

	private onDeliveryFailure() {
		this._cartDeliveryService.onDeliveryFailure().subscribe((err) => {
			if (this.deliveryMethod === 'bring' && !this.validateDeliveryMethodBring()) {
				this.deliveryError = false;
			} else {
				this.deliveryError = true;
			}
		});
	}

	private setDeliveryBranch() {
		this._cartDeliveryService.setBranchDelivery();
	}

	private setDeliveryBring() {
		if (this.validateDeliveryMethodBring()) {
			this._cartDeliveryService.setBringDelivery(this.toName, this.toAddress, this.toPostalCity, this.toPostalCode);
		} else {
			this._cartDeliveryService.setDeliveryFailure();
		}
	}
}
