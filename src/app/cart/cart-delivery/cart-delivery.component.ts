import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlApiError, Delivery, Order, DeliveryMethod, UserDetail, Branch} from "@wizardcoder/bl-model";
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

	public toPostalCode: string;
	public toName: string;
	public toAddress: string;
	public toPostalCity: string;

	public postalCodeFailure: boolean;
	public failureText: string;
	public branch: Branch;

	constructor(private _dateService: DateService, private _cartDeliveryService: CartDeliveryService, private _userService: UserService,
				private _branchStoreService: BranchStoreService) {

		this.deliveryMethod = 'branch';
		this.delivery = new EventEmitter();
		this.postalCodeFailure = true;
		this.toPostalCode = '';

		this.failureText = null;
		this.currentDelivery = this._cartDeliveryService.getDelivery();

		this.onDeliveryFailure();

		if (this.currentDelivery) {
			this.deliveryMethod = this.currentDelivery.method;
		}

		this._userService.getUserDetail().then((userDetail: UserDetail) => {
			this.toName = (userDetail.name) ? userDetail.name : '';
			this.toAddress = (userDetail.address) ? userDetail.address : '';
			this.toPostalCity = (userDetail.postCity) ? userDetail.postCity : '';
			this.toPostalCode = (userDetail.postCode) ? userDetail.postCode : '';
		}).catch((getUserDetailError) => {
			console.log('cartDeliveryService: could not get user detail');
		});
	}

	ngOnInit() {
		this.currentDelivery = this._cartDeliveryService.getDelivery();


		if (this.currentDelivery) {
			this.deliveryMethod = this.currentDelivery.method;

			if (this.deliveryMethod === 'bring') {
				this.validateDeliveryMethodBring();
			}
		}

		this._cartDeliveryService.onDeliveryChange().subscribe((delivery: Delivery) => {
			this.failureText = null;
			this.currentDelivery = this._cartDeliveryService.getDelivery();
			this.deliveryMethod = this.currentDelivery.method;
		});


		this.branch = this._branchStoreService.getBranch();
	}


	onPostalCodeChange() {
		if (this.validateDeliveryMethodBring()) {
			this.setDeliveryBring();
		}
	}

	validateDeliveryMethodBring(): boolean {
		if (!this.toName || this.toName.length <= 0) {
			this.failureText = 'please provide a valid name';
			this._cartDeliveryService.setDeliveryFailure();
			return false;
		}

		if (!this.toAddress || this.toAddress.length <= 0) {
			this.failureText = 'please provide a valid address';
			this._cartDeliveryService.setDeliveryFailure();
			return false;
		}

		if (!this.toPostalCity || this.toPostalCity.length <= 0) {
			this.failureText = 'please provide a valid postal city';
			this._cartDeliveryService.setDeliveryFailure();
			return false;
		}

		if (!this.toPostalCode || this.toPostalCode.length < 4) {
			this.failureText = 'please provide a valid postal code';
			this._cartDeliveryService.setDeliveryFailure();
			return false;
		}

		return true;
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

	private onDeliveryFailure() {
		this._cartDeliveryService.onDeliveryFailure().subscribe(() => {

			this.failureText = (this.failureText) ? this.failureText : 'please provide a valid postal code';
		});
	}

	private setDeliveryBranch() {
		this._cartDeliveryService.setBranchDelivery();
	}

	private setDeliveryBring() {
		if (this.validateDeliveryMethodBring()) {
			this._cartDeliveryService.setBringDelivery(this.toName, this.toAddress, this.toPostalCity, this.toPostalCode);
		}
	}

	public getEstimatedDelivery(): string {
		if (!this.currentDelivery) {
			return '';
		}
		return this._dateService.daysUntil(this.currentDelivery.info['estimatedDelivery']);
	}
}
