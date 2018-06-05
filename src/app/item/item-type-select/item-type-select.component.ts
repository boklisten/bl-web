import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Branch, BranchItem, CustomerItem, Item, OrderItem} from "@wizardcoder/bl-model";
import {DateService} from "../../date/date.service";
import {CartService} from "../../cart/cart.service";
import {PriceService} from "../../price/price.service";
import {BranchStoreService} from "../../branch/branch-store.service";

@Component({
	selector: 'app-item-type-select',
	templateUrl: './item-type-select.component.html',
	styleUrls: ['./item-type-select.component.scss']
})
export class ItemTypeSelectComponent implements OnInit {

	@Input() item: Item;
	@Input() branchItem: BranchItem;
	@Input() customerItem: CustomerItem;
	@Input() type: 'one' | 'two' | 'buy' | 'buyout' | 'extend';
	@Output() typeChange: EventEmitter<string>;

	public typeSelect: "one" | "two" | "buy" | "buyout" | "extend";
	public desc: string;
	public date: string;

	public rentSemesterOption: boolean;
	public rentYearOption: boolean;
	public buyOption: boolean;
	public buyoutOption: boolean;
	public extendOption: boolean;
	private branch: Branch;

	constructor(private _dateService: DateService, private _cartService: CartService, private _priceService: PriceService,
				private _branchStoreService: BranchStoreService) {
		this.typeChange = new EventEmitter<string>();
		this.typeSelect = 'one';
		this.desc = '';
	}


	ngOnInit() {
		this.branch = this._branchStoreService.getBranch();
		this.displaySelectedPeriodType();
	}

	private displaySelectedPeriodType() {
		this.calculateOptions(this.item);

		if (this._cartService.contains(this.item.id)) {
			this.updateBasedOnCart(this._cartService.get(this.item.id));
		} else {
			this.preselectPeriodType(this.item);
		}

		this.typeChange.emit(this.typeSelect);
		this.desc = this.getDesc(this.typeSelect);
	}

	preselectPeriodType(item: Item) {
		// TODO: fix this to use BranchItem
		if (this.branchItem.rent) {
			if (this.branch.paymentInfo.rentPeriods && this.branch.paymentInfo.rentPeriods.length > 0) {
				const periodType =  this.branch.paymentInfo.rentPeriods[0].type;
				if (periodType === 'semester') {
					this.typeSelect = 'one';
				} else if (periodType === 'year') {
					this.typeSelect = 'two';
				}
			}
		} else if (this.branchItem.buy) {
			this.typeSelect = 'buy';
		}
	}

	isActionValid(action: 'one' | 'two' | 'buy' | 'buyout' | 'extend') {

		if ((action === 'one' || action === 'two') && this.branchItem.rent) {
			if (this.branch.paymentInfo.rentPeriods && this.branch.paymentInfo.rentPeriods.length > 0) {
				const periodType =  this.branch.paymentInfo.rentPeriods[0].type;

				for (const period of this.branch.paymentInfo.rentPeriods) {
					if (period.type === 'semester' && action === 'one') {
						return true;
					} else if (action === 'two' && period.type === 'year') {
						return true;
					}
				}
			}
		} else if (action === 'buy' && this.branchItem.buy) {
			return true;
		}
	}


	calculateOptions(item: Item) {
		if (this.customerItem) {
			return;
		}

		if (this.isActionValid('one')) {
			this.rentSemesterOption = true;
		}

		if (this.isActionValid('two')) {
			this.rentYearOption = true;
		}

		if (this.isActionValid('buy')) {
			this.buyOption = true;
		}
	}

	showDate(): boolean {
		return (this.typeSelect !== "buy");
	}

	isCustomerItem(): boolean {
		return !(!this.customerItem);
	}

	public onTypeUpdate(type: "one" | "two" | "buy" | "buyout" | "extend") {
		if (this._cartService.contains(this.item.id)) {
			this._cartService.updateType(this.item.id, type);
		}
		this.desc = this.getDesc(type);
		this.date = this.getDate(type);
		this.typeSelect = type;
		this.typeChange.emit(type);
	}

	private getDesc(type: "one" | "two" | "buy" | "buyout" | "extend") {
		switch (type) {
			case "one":
				return "rent to " + this.getDate(type);
			case "two":
				return "rent to " + this.getDate(type);
			case "buy":
				return "buy this item";
			case "buyout":
				return "buyout this item";
			case "extend":
				return "extend deadline to " + this.getDate(type);
		}
	}

	public getDate(type): string {
		return this._dateService.getDate(type);
	}

	updateBasedOnCart(orderItem: OrderItem) {

		if (orderItem.type === "rent") {
			if (orderItem.info.periodType === "semester") {
				this.typeSelect = "one";
			} else if (orderItem.info.periodType === "year") {
				this.typeSelect = "two";
			}
		} else if (orderItem.type === "buy") {
			this.typeSelect = "buy";
		} else if (orderItem.type === "buyout") {
			this.typeSelect = "buyout";
		} else if (orderItem.type === "extend") {
			this.typeSelect = "extend";
		}

	}

	public showPrice(): boolean {
		return this._priceService.showPrice();
	}

}
