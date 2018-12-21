import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import {
	BlApiError,
	Delivery,
	Order,
	DeliveryMethod,
	UserDetail,
	Branch
} from "@wizardcoder/bl-model";
import { DateService } from "../../date/date.service";
import { DeliveryService } from "@wizardcoder/bl-connect";
import { BranchStoreService } from "../../branch/branch-store.service";
import { CartDeliveryService } from "./cart-delivery.service";
import { CartCheckoutService } from "../cart-checkout/cart-checkout.service";
import { CartService } from "../cart.service";
import { CartOrderService } from "../cart-order/cart-order.service";
import { isNumber } from "util";
import { UserService } from "../../user/user.service";

@Component({
	selector: "app-cart-delivery",
	templateUrl: "./cart-delivery.component.html",
	styleUrls: ["./cart-delivery.component.scss"]
})
export class CartDeliveryComponent implements OnInit {
	@Output() delivery: EventEmitter<Delivery>;
	@Output() confirmDelivery: EventEmitter<boolean>;

	public deliveryMethod: DeliveryMethod;
	public currentDelivery: Delivery;
	public mailOption: boolean;
	public branchOption: boolean;
	public deliveryError: boolean;
	public wait: boolean;

	public toPostalCode: string;
	public toName: string;
	public toAddress: string;
	public toPostalCity: string;
	public failureText: string;
	public bringInputWarning: string;
	public branch: Branch;
	public showConfirmShipmentButton: boolean;

	constructor(
		private _dateService: DateService,
		private _cartDeliveryService: CartDeliveryService,
		private _userService: UserService,
		private _branchStoreService: BranchStoreService
	) {
		this.delivery = new EventEmitter();
		this.bringInputWarning = "";
		this.failureText = null;
		this.confirmDelivery = new EventEmitter();
		this.wait = false;
	}

	ngOnInit() {
		this.currentDelivery = this._cartDeliveryService.getDelivery();
		this.branch = this._branchStoreService.getBranch();
		this.deliveryMethod = this._cartDeliveryService.getDefaultDeliveryMethod();

		this.setDeliveryOptions();
		this.setDefaultDeliveryMethod();

		this.setDeliveryDetails();
		this.onDeliveryFailure();

		if (!this.currentDelivery) {
			this.onSetDelivery(this.deliveryMethod)
				.then(() => {})
				.catch(() => {});
		}

		this.failureText = null;
		this.bringInputWarning = "";
	}

	public onConfirmDelivery() {
		if (this.deliveryMethod === "bring") {
			if (!this.validateDeliveryMethodBring()) {
				return;
			}
		}

		this.confirmDelivery.emit(true);
	}

	private setDeliveryOptions() {
		if (this.branch.deliveryMethods) {
			this.branchOption = this.branch.deliveryMethods.branch;
			this.mailOption = this.branch.deliveryMethods.byMail;

			if (
				this.branchOption === undefined ||
				this.mailOption === undefined
			) {
				this.branchOption = true;
				this.mailOption = true;
			}
		} else {
			this.branchOption = true;
			this.mailOption = true;
		}
	}

	public setDefaultDeliveryMethod() {
		if (this.currentDelivery) {
			this.deliveryMethod = this.currentDelivery.method;
			return;
		}

		if (this.branchOption) {
			this.deliveryMethod = "branch";
		} else if (this.mailOption) {
			this.deliveryMethod = "bring";
		} else {
			this.deliveryMethod = "branch";
		}
	}

	private setDeliveryDetails() {
		if (!this.currentDelivery) {
			this._userService
				.getUserDetail()
				.then((userDetail: UserDetail) => {
					this.toName = userDetail.name ? userDetail.name : "";
					this.toAddress = userDetail.address
						? userDetail.address
						: "";
					this.toPostalCity = userDetail.postCity
						? userDetail.postCity
						: "";
					this.toPostalCode = userDetail.postCode
						? userDetail.postCode
						: "";
					this.validateDeliveryMethodBring();
				})
				.catch(getUserDetailError => {
					console.log(
						"cartDeliveryService: could not get user detail"
					);
				});
		} else {
			if (
				this.currentDelivery.method === "bring" &&
				this.currentDelivery.info["shipmentAddress"]
			) {
				let shipmentAddress = this.currentDelivery.info[
					"shipmentAddress"
				];
				this.toName = shipmentAddress.name;
				this.toAddress = shipmentAddress.address;
				this.toPostalCode = shipmentAddress.postalCode;
				this.toPostalCity = shipmentAddress.postalCity;
			}
		}
	}

	public onInputEnterClick() {
		if (this.validateDeliveryMethodBring()) {
			this.onSetDelivery(this.deliveryMethod)
				.then(() => {})
				.catch(() => {});
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

	public validateDeliveryMethodBring(): boolean {
		this.bringInputWarning = "";
		this.deliveryError = false;

		if (!this.toName || this.toName.length <= 0) {
			this.bringInputWarning = "invalid-name";
			return false;
		}

		if (!this.toAddress || this.toAddress.length <= 0) {
			this.bringInputWarning = "invalid-address";
			return false;
		}

		if (!this.toPostalCity || this.toPostalCity.length <= 0) {
			this.bringInputWarning = "invalid-postal-city";
			return false;
		}

		if (!this.toPostalCode || this.toPostalCode.length < 4) {
			this.bringInputWarning = "invalid-postal-code";
			return false;
		}

		this.bringInputWarning = "";
		return true;
	}

	public onSetDelivery(deliveryMethod: DeliveryMethod): Promise<boolean> {
		this.wait = true;

		this.deliveryMethod = deliveryMethod;

		switch (deliveryMethod) {
			case "bring":
				return this.setDeliveryBring();
			case "branch":
				return this.setDeliveryBranch();
		}
	}

	private onDeliveryFailure() {
		this._cartDeliveryService.onDeliveryFailure().subscribe(err => {
			if (
				this.deliveryMethod === "bring" &&
				!this.validateDeliveryMethodBring()
			) {
				this.deliveryError = false;
			} else {
				this.deliveryError = true;
			}
		});
	}

	private setDeliveryBranch(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this._cartDeliveryService
				.setBranchDelivery()
				.then(addedDelivery => {
					this.currentDelivery = addedDelivery;
					this.wait = false;
					resolve(true);
				})
				.catch(err => {
					console.log("could not set delivery method to branch", err);
					this.wait = false;
					reject(err);
				});
		});
	}

	private setDeliveryBring(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (this.validateDeliveryMethodBring()) {
				this._cartDeliveryService
					.setBringDelivery(
						this.toName,
						this.toAddress,
						this.toPostalCity,
						this.toPostalCode
					)
					.then(addedDelivery => {
						this.currentDelivery = addedDelivery;
						this.wait = false;
						resolve(true);
					})
					.catch(err => {
						console.log(
							"could not set delivery method to bring",
							err
						);
						this.wait = false;
						reject(err);
					});
			} else {
				this._cartDeliveryService.setDeliveryFailure();
				this.wait = false;
				reject("bring delivery data is not valid");
			}
		});
	}
}
