import { Injectable } from "@angular/core";
import { DeliveryService } from "@boklisten/bl-connect";
import { Delivery, Order, DeliveryMethod, Branch } from "@boklisten/bl-model";
import { Subject, Observable } from "rxjs";
import { CartService } from "../cart.service";
import { CartOrderService } from "../cart-order/cart-order.service";
import { BranchStoreService } from "../../branch/branch-store.service";

@Injectable()
export class CartDeliveryService {
	private _deliveryChange$: Subject<Delivery>;
	private _currentDelivery: Delivery;
	private _fromPostalCode: string;
	private _fromPostalCity: string;
	private _fromAddress: string;
	private _deliveryMethod: DeliveryMethod;
	private _toName: string;
	private _toAddress: string;
	private _toPostalCity: string;
	private _toPostalCode: string;
	private _deliveryReady: boolean;

	constructor(
		private _deliveryService: DeliveryService,
		private _cartService: CartService,
		private _cartOrderService: CartOrderService,
		private _branchStoreService: BranchStoreService
	) {
		this._deliveryChange$ = new Subject();

		this._deliveryMethod = this.getDefaultDeliveryMethod();
		this._fromPostalCode = "1316";
		this._fromPostalCity = "OSLO";
		this._fromAddress = "Postboks 8, 1316 Eiksmarka";

		this.onOrderClear();
	}

	public getDeliveryAmount(): number {
		return this._currentDelivery ? this._currentDelivery.amount : 0;
	}

	public setBranchDelivery(): Promise<Delivery> {
		this._deliveryMethod = "branch";

		return this.createDelivery(this._cartOrderService.getOrder());
	}

	public setBringDelivery(
		toName: string,
		toAddress: string,
		toPostalCity: string,
		toPostalCode: string
	): Promise<Delivery> {
		this._deliveryMethod = "bring";
		this._toName = toName;
		this._toAddress = toAddress;
		this._toPostalCity = toPostalCity;
		this._toPostalCode = toPostalCode;

		return this.createDelivery(this._cartOrderService.getOrder());
	}

	public getDefaultDeliveryMethod(): "branch" | "bring" {
		const branch: Branch = this._branchStoreService.getBranch();

		if (!branch) {
			return "branch";
		}

		if (branch.deliveryMethods) {
			if (branch.deliveryMethods.branch) {
				return "branch";
			} else if (branch.deliveryMethods.byMail) {
				return "bring";
			} else {
				return "branch";
			}
		}

		return "branch";
	}

	public onDeliveryChange(): Subject<Delivery> {
		return this._deliveryChange$;
	}

	public getDelivery(): Delivery {
		return this._currentDelivery;
	}

	public validateDeliveryMethodBring(): boolean {
		if (!this._toName || this._toName.length <= 0) {
			return false;
		}

		if (!this._toAddress || this._toAddress.length <= 0) {
			return false;
		}

		if (!this._toPostalCity || this._toPostalCity.length <= 0) {
			return false;
		}

		if (!this._toPostalCode || this._toPostalCode.length < 4) {
			return false;
		}

		return true;
	}

	private validateDeliveryDetails() {
		if (this._deliveryMethod === "bring") {
			return this.validateDeliveryMethodBring();
		} else {
			return true;
		}
	}

	private async createDelivery(order: Order): Promise<Delivery> {
		let delivery: Delivery;

		if (this._deliveryMethod === "bring") {
			delivery = this.createBringDelivery(order);
		} else if (this._deliveryMethod === "branch") {
			delivery = this.createBranchDelivery(order);
		}

		if (!delivery) {
			return Promise.reject(new Error("could not create delivery"));
		}

		const addedDelivery = await this._deliveryService.add(delivery);
		await this._cartOrderService.patchDelivery(addedDelivery.id);
		this._currentDelivery = addedDelivery;
		this._deliveryChange$.next(this._currentDelivery);
		return addedDelivery;
	}

	private onOrderChange() {
		this._cartOrderService.onOrderChange().subscribe(() => {
			this._currentDelivery = null;
			this._fromPostalCode = "";
			this._deliveryMethod = "branch";
		});
	}

	private onOrderClear() {
		this._cartOrderService.onClearOrder().subscribe(() => {
			this._currentDelivery = null;
			this._fromPostalCode = "";
			this._deliveryMethod = "branch";
		});
	}

	private createBringDelivery(order: Order): Delivery {
		return {
			method: "bring",
			info: {
				from: "1316",
				to: this._toPostalCode,
				shipmentAddress: {
					name: this._toName,
					address: this._toAddress,
					postalCode: this._toPostalCode,
					postalCity: this._toPostalCity,
				},
				facilityAddress: {
					address: this._fromAddress,
					postalCode: "1316",
					postalCity: this._fromPostalCity,
				},
			},
			order: order.id,
			amount: 0,
		} as any;
	}

	private createBranchDelivery(order: Order): Delivery {
		return {
			method: "branch",
			info: {
				branch: order.branch,
			},
			order: order.id,
			amount: 0,
		} as any;
	}
}
