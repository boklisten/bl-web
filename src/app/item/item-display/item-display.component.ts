import {Component, Input, OnInit} from '@angular/core';
import {Branch, BranchItem, CustomerItem, Item} from "@wizardcoder/bl-model";
import {CartService} from "../../cart/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PriceService} from "../../price/price.service";
import {UserService} from "../../user/user.service";
import {BranchStoreService} from "../../branch/branch-store.service";
import {ItemService} from "@wizardcoder/bl-connect";
import {OrderItemType} from "@wizardcoder/bl-model/dist/order/order-item/order-item-type";
import {UserOrderService} from "../../user/order/user-order/user-order.service";
import {UserCustomerItemService} from "../../user/user-customer-item/user-customer-item.service";

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
	public alreadyHaveItem: boolean;
	public alreadyOrdered: boolean;

	public orderItemType: OrderItemType | 'semester' | 'year';
	public showAdd: boolean;

	constructor(private _router: Router,
				private _priceService: PriceService,
				private _userService: UserService,
				private _userCustomerItemService: UserCustomerItemService,
				private _userOrderService: UserOrderService,
				private _itemService: ItemService,
				private _cartService: CartService) {
		this.customerItemActive = false;
		this.view = false;
		this.showAdd = false;
		this.alreadyHaveItem = false;
	}

	ngOnInit() {
		if (this.branchItem && !this.item) {
			this._itemService.getById(this.branchItem.item).then((item: Item) => {
				this.item = item;
				this.checkIfAlreadyHaveItem();
			}).catch((getItemError) => {
				console.log('ItemDisplayComponent: could not get item based on branchItem');
			});
		}

		this.isCustomerItemActive().then(() => {
			this.view = true;
		}).catch(() => {
			this.view = true;
		});

		this.checkIfAlreadyHaveItem();
	}

	private checkIfAlreadyHaveItem() {
		let itemId = '';

		if (this.item) {
			itemId = this.item.id;
		} else if (this.branchItem) {
			itemId = this.branchItem.item;
		} else {
			return;
		}

		this._userOrderService.alreadyHaveOrderedItem(itemId).then((haveOrdered: boolean) => {
			this.alreadyOrdered = haveOrdered;

			if (haveOrdered) {
				this._cartService.remove(itemId); // should remove itself if it is apart of cart for some reason
			}
		}).catch((err) => {
			console.log('UserOrderService: could not check if user already have item', err);
		});

		this._userCustomerItemService.alreadyHaveItem(itemId).then((haveItem: boolean) => {
			this.alreadyHaveItem = haveItem;
			if (haveItem) {
				this._cartService.remove(itemId); // should remove itself if it is apart of cart for some reason
			}
		}).catch((err) => {
			console.log('UserOrderService: could not check if user already have customer item', err);
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
