import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
	Branch,
	BranchItem,
	CustomerItem,
	Item,
	OrderItem,
	Period,
} from "@boklisten/bl-model";
import { DateService } from "../../date/date.service";
import { CartService } from "../../cart/cart.service";
import { PriceService } from "../../price/price.service";
import { BranchStoreService } from "../../branch/branch-store.service";
import { OrderItemType } from "@boklisten/bl-model";
import { UserCustomerItemService } from "../../user/user-customer-item/user-customer-item.service";

@Component({
	selector: "app-item-type-select",
	templateUrl: "./item-type-select.component.html",
	styleUrls: ["./item-type-select.component.scss"],
})
export class ItemTypeSelectComponent implements OnInit {
	@Input() item: Item;
	@Input() branchItem: BranchItem;
	@Input() customerItem: CustomerItem;
	@Input() type: OrderItemType;
	@Output() typeChange: EventEmitter<{
		action: OrderItemType;
		period?: Period;
	}>;

	public typeSelect: string;
	public desc: string;
	public date: string;
	public allowedActions: { action: OrderItemType; period: Period }[];
	private branch: Branch;
	public selectedAction: { action: OrderItemType; period: Period };

	constructor(
		private _dateService: DateService,
		private _cartService: CartService,
		private _priceService: PriceService,
		private _userCustomerItemService: UserCustomerItemService,
		private _branchStoreService: BranchStoreService
	) {
		this.typeChange = new EventEmitter();
		this.typeSelect = "partly-payment";
		this.desc = "";
		this.allowedActions = [];
	}

	ngOnInit() {
		this.branch = this._branchStoreService.getBranch();

		if ((this.isCustomerItem() || this.branchItem) && this.item) {
			this.displaySelectedPeriodType();
		}

		// When this component initializes, the cart is empty
		// Therefore, it needs a little nudge to be be updated when the cart is populated
		this._cartService.onCartChange().subscribe(() => {
			this.displaySelectedPeriodType();
		});
	}

	public isCustomerItem(): boolean {
		return !!this.customerItem;
	}

	public onTypeUpdate(type: OrderItemType, period?: Period) {
		this._cartService.addOrUpdate(this.item, this.branchItem, type, period);
		this.selectedAction = { action: type, period: period };
		this.typeChange.emit({ action: type, period: period });
	}

	public getDate(action, period): Date {
		if (action === "partly-payment") {
			return this._dateService.getPartlyPaymentPeriodDate(period);
		} else {
			return this._dateService.getPeriodDate(period);
		}
	}

	private preselectPeriodType() {
		let action: OrderItemType;
		let period: Period;

		if (this.customerItem) {
			action = "extend";
		} else if (this.branchItem && this.branchItem.partlyPayment) {
			if (
				this.branch.paymentInfo.partlyPaymentPeriods &&
				this.branch.paymentInfo.partlyPaymentPeriods.length > 0
			) {
				action = "partly-payment";
				period = this.branch.paymentInfo.partlyPaymentPeriods[0].type;
			}
		} else if (this.branchItem && this.branchItem.rent) {
			if (
				this.branch.paymentInfo.rentPeriods &&
				this.branch.paymentInfo.rentPeriods.length > 0
			) {
				action = "rent";
				period = this.branch.paymentInfo.rentPeriods[0].type;
			}
		} else if (this.branchItem && this.branchItem.buy) {
			action = "buy";
		}

		this.selectedAction = { action: action, period: period };
		this.typeSelect = action + period;
	}

	private isActionValid(action: OrderItemType, period?: Period) {
		const isItemExtendable = this._userCustomerItemService.isExtendableCustomerItem(
			this.item.id
		);

		if (
			action === "partly-payment" &&
			this.branchItem &&
			this.branchItem.partlyPayment
		) {
			if (
				this.branch.paymentInfo.partlyPaymentPeriods &&
				this.branch.paymentInfo.partlyPaymentPeriods.length > 0
			) {
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
			this.branchItem.rent &&
			!isItemExtendable
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
		this.allowedActions = [];
		let actions: { action: OrderItemType; period?: Period }[] = [
			{ action: "partly-payment", period: "semester" },
			{ action: "partly-payment", period: "year" },
			{ action: "rent", period: "semester" },
			{ action: "rent", period: "year" },
			{ action: "buy" },
			{ action: "extend", period: "semester" },
			{ action: "buyout" },
		];

		actions.forEach((action) => {
			if (this.isActionValid(action.action, action.period)) {
				this.allowedActions.push({
					action: action.action,
					period: action.period,
				});
			}
		});
	}

	private updateTypeBasedOnCart(orderItem: OrderItem) {
		let period =
			orderItem.info && orderItem.info.periodType
				? orderItem.info.periodType
				: "";
		this.typeSelect = orderItem.type + period;
		this.selectedAction = {
			action: orderItem.type,
			period: period as Period,
		};
	}

	private displaySelectedPeriodType() {
		this.calculateOptions();

		if (this._cartService.contains(this.item.id)) {
			this.updateTypeBasedOnCart(this._cartService.get(this.item.id));
		} else {
			this.preselectPeriodType();
		}

		this.typeChange.emit(this.selectedAction);
	}
}
