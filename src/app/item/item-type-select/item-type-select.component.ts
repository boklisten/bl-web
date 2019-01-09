import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
	Branch,
	BranchItem,
	CustomerItem,
	Item,
	OrderItem,
	Period
} from "@wizardcoder/bl-model";
import { DateService } from "../../date/date.service";
import { CartService } from "../../cart/cart.service";
import { PriceService } from "../../price/price.service";
import { BranchStoreService } from "../../branch/branch-store.service";
import { OrderItemType } from "@wizardcoder/bl-model/dist/order/order-item/order-item-type";
import { UserCustomerItemService } from "../../user/user-customer-item/user-customer-item.service";

@Component({
	selector: "app-item-type-select",
	templateUrl: "./item-type-select.component.html",
	styleUrls: ["./item-type-select.component.scss"]
})
export class ItemTypeSelectComponent implements OnInit {
	@Input() item: Item;
	@Input() branchItem: BranchItem;
	@Input() customerItem: CustomerItem;
	@Input() type: OrderItemType;
	@Output() typeChange: EventEmitter<string>;

	public typeSelect: OrderItemType;
	public desc: string;
	public date: string;

	public rentSemesterOption: boolean;
	public rentYearOption: boolean;
	public buyOption: boolean;
	public partlyPaymentOption: boolean;
	public extendOption: boolean;
	public buyoutOption: boolean;
	private branch: Branch;

	constructor(
		private _dateService: DateService,
		private _cartService: CartService,
		private _priceService: PriceService,
		private _userCustomerItemService: UserCustomerItemService,
		private _branchStoreService: BranchStoreService
	) {
		this.typeChange = new EventEmitter<string>();
		this.typeSelect = "partly-payment";
		this.desc = "";
	}

	ngOnInit() {
		this.branch = this._branchStoreService.getBranch();

		if ((this.isCustomerItem() || this.branchItem) && this.item) {
			this.displaySelectedPeriodType();
		}
	}

	isCustomerItem(): boolean {
		return !!this.customerItem;
	}

	public onTypeUpdate(type: OrderItemType) {
		this.typeSelect = type;
		this._cartService.addOrUpdate(
			this.item,
			this.branchItem,
			this.typeSelect
		);
		this.typeChange.emit(this.typeSelect);
	}

	public getDate(type): Date {
		return this._dateService.getDate(type);
	}

	private preselectPeriodType() {
		if (this.customerItem) {
			this.typeSelect = "extend";
		} else if (this.branchItem && this.branchItem.partlyPayment) {
			if (
				this.branch.paymentInfo.partlyPaymentPeriods &&
				this.branch.paymentInfo.partlyPaymentPeriods.length > 0
			) {
				this.typeSelect = "partly-payment";
			}
		} else if (this.branchItem && this.branchItem.rent) {
			if (
				this.branch.paymentInfo.rentPeriods &&
				this.branch.paymentInfo.rentPeriods.length > 0
			) {
				this.typeSelect = "rent";
			}
		} else if (this.branchItem && this.branchItem.buy) {
			this.typeSelect = "buy";
		}
	}

	private isActionValid(action: OrderItemType, period?: Period) {
		if (
			action === "partly-payment" &&
			this.branchItem &&
			this.branchItem.partlyPayment
		) {
			if (
				this.branch.paymentInfo.partlyPaymentPeriods &&
				this.branch.paymentInfo.partlyPaymentPeriods.length > 0
			) {
				if (!period) {
					// if no period selected partly payment should be allowed
					return true;
				}
				for (let partlyPaymentPeriod of this.branch.paymentInfo
					.partlyPaymentPeriods) {
					if (partlyPaymentPeriod.type === period) {
						return true;
					}
				}
			}
		} else if (
			action === "rent" &&
			this.branchItem &&
			this.branchItem.rent
		) {
			if (
				this.branch.paymentInfo.rentPeriods &&
				this.branch.paymentInfo.rentPeriods.length > 0
			) {
				for (let rentPeriod of this.branch.paymentInfo.rentPeriods) {
					if (rentPeriod.type === period) {
						return true;
					}
				}
			}
		} else if (action === "buy" && this.branchItem && this.branchItem.buy) {
			return true;
		} else if (action === "extend" && this.isCustomerItem()) {
			return this._userCustomerItemService.isExtendValid(
				this.customerItem
			);
		} else if (action === "buyout" && this.isCustomerItem()) {
			return this._userCustomerItemService.isBuyoutValid(
				this.customerItem
			);
		}

		return false;
	}

	private calculateOptions() {
		/*
		if (this.isActionValid()) {
			this.rentSemesterOption = true;
		}

		if (this.isActionValid("year")) {
			this.rentYearOption = true;
    }
     */

		if (this.isActionValid("partly-payment")) {
			this.partlyPaymentOption = true;
		}

		if (this.isActionValid("buy")) {
			this.buyOption = true;
		}

		if (this.isActionValid("extend")) {
			this.extendOption = true;
		}

		if (this.isActionValid("buyout")) {
			this.buyoutOption = true;
		}
	}

	private updateTypeBasedOnCart(orderItem: OrderItem) {
		this.typeSelect = orderItem.type;
	}

	private displaySelectedPeriodType() {
		this.calculateOptions();

		if (this._cartService.contains(this.item.id)) {
			this.updateTypeBasedOnCart(this._cartService.get(this.item.id));
		} else {
			this.preselectPeriodType();
		}

		this.typeChange.emit(this.typeSelect);
	}
}
