import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Branch, BranchItem, CustomerItem, Item, OrderItem} from "@wizardcoder/bl-model";
import {DateService} from "../../date/date.service";
import {CartService} from "../../cart/cart.service";
import {PriceService} from "../../price/price.service";
import {BranchStoreService} from "../../branch/branch-store.service";
import {OrderItemType} from "@wizardcoder/bl-model/dist/order/order-item/order-item-type";

@Component({
	selector: 'app-item-type-select',
	templateUrl: './item-type-select.component.html',
	styleUrls: ['./item-type-select.component.scss']
})
export class ItemTypeSelectComponent implements OnInit {

	@Input() item: Item;
	@Input() branchItem: BranchItem;
	@Input() customerItem: CustomerItem;
	@Input() type: OrderItemType | 'semester' | 'year';
	@Output() typeChange: EventEmitter<string>;

	public typeSelect: OrderItemType | 'semester' | 'year';
	public desc: string;
	public date: string;

	public rentSemesterOption: boolean;
	public rentYearOption: boolean;
	public buyOption: boolean;
	public extendOption: boolean;
	public buyoutOption: boolean;
	private branch: Branch;

	constructor(private _dateService: DateService,
				private _cartService: CartService,
				private _priceService: PriceService,
				private _branchStoreService: BranchStoreService) {
		this.typeChange = new EventEmitter<string>();
		this.typeSelect = 'semester';
		this.desc = '';
	}


	ngOnInit() {
		this.branch = this._branchStoreService.getBranch();

		if ((this.isCustomerItem() || this.branchItem) && this.item) {
			this.displaySelectedPeriodType();
		}
	}

	isCustomerItem(): boolean {
		return !(!this.customerItem);
	}

	public onTypeUpdate(type: 'extend' | 'buyout' | 'semester' | 'year') {
		this.typeSelect = type;
		this._cartService.addOrUpdate(this.item, this.branchItem, this.typeSelect);
		this.typeChange.emit(this.typeSelect);
	}

	public getDate(type): Date {
		return this._dateService.getDate(type);
	}

	private preselectPeriodType() {
		if (this.customerItem) {
			this.typeSelect = 'extend';
		} else if (this.branchItem && this.branchItem.rent) {
			if (this.branch.paymentInfo.rentPeriods && this.branch.paymentInfo.rentPeriods.length > 0) {
				this.typeSelect = this.branch.paymentInfo.rentPeriods[0].type;
			}
		} else if (this.branchItem && this.branchItem.buy) {
			this.typeSelect = 'buy';
		}
	}

	private isActionValid(action: OrderItemType | 'semester' | 'year') {

		if ((action === 'semester' || action === 'year') && this.branchItem && this.branchItem.rent) {
			if (this.branch.paymentInfo.rentPeriods && this.branch.paymentInfo.rentPeriods.length > 0) {

				for (const period of this.branch.paymentInfo.rentPeriods) {
					if (period.type === 'semester' && action === 'semester') {
						return true;
					} else if (action === 'year' && period.type === 'year') {
						return true;
					}
				}
			}
		} else if (action === 'buy' && this.branchItem && this.branchItem.buy) {
			return true;
		} else if (action === 'extend' && this.isCustomerItem()) {
			return true;
		} else if (action === 'buyout' && this.isCustomerItem()) {
			return true;
		}
	}

	private calculateOptions(item: Item) {
		if (this.customerItem) {
			return;
		}

		if (this.isActionValid('semester')) {
			this.rentSemesterOption = true;
		}

		if (this.isActionValid('year')) {
			this.rentYearOption = true;
		}

		if (this.isActionValid('buy')) {
			this.buyOption = true;
		}

		if (this.isActionValid('extend')) {
			this.extendOption = true;
		}


	}

	private updateTypeBasedOnCart(orderItem: OrderItem) {
		if (orderItem.type === "rent") {
			if (orderItem.info.periodType === "semester") {
				this.typeSelect = "semester";
			} else if (orderItem.info.periodType === "year") {
				this.typeSelect = "year";
			}
		} else {
			this.typeSelect = orderItem.type;
		}
	}

	private displaySelectedPeriodType() {
		this.calculateOptions(this.item);

		if (this._cartService.contains(this.item.id)) {
			this.updateTypeBasedOnCart(this._cartService.get(this.item.id));
		} else {
			this.preselectPeriodType();
		}

		this.typeChange.emit(this.typeSelect);
	}

}
