import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import {
	BlApiError,
	Delivery,
	Order,
	DeliveryMethod,
	UserDetail,
	Branch,
} from "@boklisten/bl-model";
import { DateService } from "../../date/date.service";
import { DeliveryService } from "@boklisten/bl-connect";
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
	styleUrls: ["./cart-delivery.component.scss"],
})
export class CartDeliveryComponent implements OnInit {
	@Output() delivery: EventEmitter<Delivery>;
	@Output() confirmDelivery: EventEmitter<boolean>;

	public deliveryMethod: DeliveryMethod;
	public currentDelivery: Delivery;
	public mailOption: boolean;
	public branchOption: boolean;
	public wait: boolean;
	public waitForPrice: boolean;

	public toPostalCode: string;
	public toName: string;
	public toAddress: string;
	public toPostalCity: string;
	public product: string;
	public branch: Branch;
	public bringInputWarning = "";
	private totalCartPrice: number;

	constructor(
		private _dateService: DateService,
		private _cartDeliveryService: CartDeliveryService,
		private _userService: UserService,
		private _branchStoreService: BranchStoreService
	) {
		this.delivery = new EventEmitter();
		this.confirmDelivery = new EventEmitter();
	}

	async ngOnInit() {
		this.currentDelivery = this._cartDeliveryService.getDelivery();
		this.branch = this._branchStoreService.getBranch();
		this.deliveryMethod = this._cartDeliveryService.getDefaultDeliveryMethod();

		this.branchOption = this.branch.deliveryMethods?.branch ?? true;
		this.mailOption = this.branch.deliveryMethods?.byMail ?? true;

		await this.setDeliveryDetails();
		await this.onSetDelivery(this.deliveryMethod);
	}

	public async onConfirmDelivery() {
		if (this.deliveryMethod === "bring") {
			await this.onSetDelivery(this.deliveryMethod);
		}
		this.confirmDelivery.emit(true);
	}

	private toReadableProduct(productId: string) {
		return productId === "3584"
			? "pakke i postkassen"
			: "pakke til hentested";
	}

	private async setDeliveryDetails() {
		if (!this.currentDelivery) {
			try {
				const userDetail = await this._userService.getUserDetail();
				this.toName = userDetail.name ?? "";
				this.toAddress = userDetail.address ?? "";
				this.toPostalCode = userDetail.postCode ?? "";
				this.product = "";
			} catch (getUserDetailError) {
				console.log("cartDeliveryService: could not get user detail");
			}
		} else if (
			this.currentDelivery.method === "bring" &&
			this.currentDelivery.info["shipmentAddress"]
		) {
			const shipmentAddress = this.currentDelivery.info[
				"shipmentAddress"
			];
			this.toName = shipmentAddress.name;
			this.toAddress = shipmentAddress.address;
			this.toPostalCode = shipmentAddress.postalCode;
			this.toPostalCity = shipmentAddress.postalCity;
			this.product = this.toReadableProduct(
				this.currentDelivery.info["product"]
			);
		}
	}

	public async validateAndSave() {
		if (this.validateInput()) {
			await this.onSetDelivery(this.deliveryMethod);
		}
	}

	public validateInput(): boolean {
		this.bringInputWarning = "";

		if (!this.toPostalCode || this.toPostalCode.length < 4) {
			this.displayError("invalid-postal-code");
			return false;
		}

		if (!this.toName || this.toName.length <= 0) {
			this.displayError("invalid-name");
			return false;
		}

		if (!this.toAddress || this.toAddress.length <= 0) {
			this.displayError("invalid-address");
			return false;
		}

		this.bringInputWarning = "";
		return true;
	}

	public async onSetDelivery(deliveryMethod: DeliveryMethod) {
		this.wait = true;

		this.deliveryMethod = deliveryMethod;
		if (deliveryMethod === "bring") {
			await this.setDeliveryBring();
		} else {
			await this.setDeliveryBranch();
		}

		this.wait = false;
	}

	private async setDeliveryBranch() {
		try {
			this.currentDelivery = await this._cartDeliveryService.setBranchDelivery();
		} catch {}
	}

	private displayError(error) {
		this.bringInputWarning = error;
		this.confirmDelivery.emit(false);

		if (error === "invalid-postal-code") {
			this.currentDelivery = null;
			this.toPostalCity = "";
		}
	}

	private postalCodeChanged() {
		return (
			this.currentDelivery?.info["shipmentAddress"]?.postalCode !==
			this.toPostalCode
		);
	}
	private deliveryInfoUnchanged() {
		const shipmentAddress = this.currentDelivery?.info["shipmentAddress"];
		return (
			shipmentAddress?.postalCode === this.toPostalCode &&
			shipmentAddress?.address === this.toAddress &&
			shipmentAddress?.name === this.toName
		);
	}

	private async setDeliveryBring() {
		if (this.deliveryInfoUnchanged()) {
			return;
		}
		this.waitForPrice = this.postalCodeChanged();
		try {
			this.currentDelivery = await this._cartDeliveryService.setBringDelivery(
				this.toName,
				this.toAddress,
				this.toPostalCity,
				this.toPostalCode
			);
			this.toPostalCity = this.currentDelivery.info[
				"shipmentAddress"
			].postalCity;
			this.product = this.toReadableProduct(
				this.currentDelivery.info["product"]
			);
		} catch (err) {
			this.displayError("invalid-postal-code");
			this.toPostalCity = "";
			this.product = "";
		}
		this.waitForPrice = false;
	}
}
