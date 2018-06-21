import {Component, Input, OnInit} from '@angular/core';
import {Branch, BranchItem, CustomerItem, Item} from "@wizardcoder/bl-model";
import {CartService} from "../../cart/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PriceService} from "../../price/price.service";
import {UserService} from "../../user/user.service";
import {BranchStoreService} from "../../branch/branch-store.service";
import {ItemService} from "@wizardcoder/bl-connect";
import {OrderItemType} from "@wizardcoder/bl-model/dist/order/order-item/order-item-type";

@Component({
	selector: 'app-item-display',
	templateUrl: './item-display.component.html',
	styleUrls: ['./item-display.component.scss']
})
export class ItemDisplayComponent implements OnInit {
	@Input() compact: boolean;
	@Input() item: Item;
	@Input() branchItem: BranchItem;
	@Input() customerItem: CustomerItem;
	@Input() branch: Branch;
	@Input() inCart: boolean;

	public view: boolean;

	public customerItemActive: boolean;

	public orderItemType: OrderItemType | 'semester' | 'year';
	public showAdd: boolean;

	constructor(private _router: Router,
				private _priceService: PriceService,
				private _userService: UserService,
				private _itemService: ItemService) {
		this.customerItemActive = false;
		this.view = false;
		this.showAdd = false;
	}

	ngOnInit() {
		if (this.branchItem && !this.item) {
			this._itemService.getById(this.branchItem.item).then((item: Item) => {
				this.item = item;
			}).catch((getItemError) => {
				console.log('ItemDisplayComponent: could not get item based on branchItem');
			});
		}

		this.isCustomerItemActive().then(() => {
			this.view = true;
		}).catch(() => {
			this.view = true;
		});

	}


	public onOrderItemTypeChange(type: OrderItemType) {

		setTimeout(() => { // UUUgly, Expression changed after view init
			this.showAdd = true;
			this.orderItemType = type;
		}, 0);
	}

	public isCustomerItemActive(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this._userService.isCustomerItemActive(this.item.id).then(() => {
				this.customerItemActive = true;
				resolve(true);
			}).catch(() => {
				this.customerItemActive = false;
				reject(false);
			});
		});
	}

	public isCustomerItem(): boolean {
		return !(!this.customerItem);
	}

	public getPrice(): number {
		switch (this.orderItemType) {
			case "semester":
				return this._priceService.calculateItemUnitPrice(this.item, this.branch, "semester");
			case "year":
				return this._priceService.calculateItemUnitPrice(this.item, this.branch, "year");
			case "buy":
				return this._priceService.calculateItemUnitPrice(this.item, this.branch, "buy");
			case "buyout":
				return this._priceService.calculateCustomerItemUnitPrice(this.customerItem, this.item, this.branch, "buyout");
			case "extend":
				return this._priceService.calculateCustomerItemUnitPrice(this.customerItem, this.item, this.branch, "extend");
			default:
				return -1;
		}
	}
}
