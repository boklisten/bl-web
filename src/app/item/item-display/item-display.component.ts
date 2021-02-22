import { Component, Input, OnInit } from "@angular/core";
import {
	Branch,
	BranchItem,
	CustomerItem,
	Item,
	Period,
} from "@boklisten/bl-model";
import { CartService } from "../../cart/cart.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PriceService } from "../../price/price.service";
import { UserService } from "../../user/user.service";
import { BranchStoreService } from "../../branch/branch-store.service";
import { ItemService } from "@boklisten/bl-connect";
import { OrderItemType } from "@boklisten/bl-model/dist/order/order-item/order-item-type";
import { UserOrderService } from "../../user/order/user-order/user-order.service";
import { UserCustomerItemService } from "../../user/user-customer-item/user-customer-item.service";

@Component({
	selector: "app-item-display",
	templateUrl: "./item-display.component.html",
	styleUrls: ["./item-display.component.scss"],
})
export class ItemDisplayComponent implements OnInit {
	@Input() compact: boolean;
	@Input() item: Item;
	@Input() branchItem: BranchItem;
	@Input() customerItem: CustomerItem;
	@Input() branch: Branch;
	@Input() inCart: boolean;
	@Input() autoAdd: boolean;

	public view: boolean;

	public customerItemActive: boolean;
	public alreadyHaveItem: boolean;
	public alreadyOrdered: boolean;

	public orderItemAction: { action: OrderItemType; period: Period };
	public showAdd: boolean;
	public period: Period;

	constructor(
		private _router: Router,
		private _priceService: PriceService,
		private _userService: UserService,
		private _userCustomerItemService: UserCustomerItemService,
		private _userOrderService: UserOrderService,
		private _itemService: ItemService,
		private _cartService: CartService
	) {
		this.customerItemActive = false;
		this.view = false;
		this.showAdd = false;
		this.alreadyHaveItem = false;
		this.period = "semester";
	}

	ngOnInit() {
		if (this.branchItem && !this.item) {
			this._itemService
				.getById(this.branchItem.item as string)
				.then((item: Item) => {
					this.item = item;
					this.checkIfAlreadyHaveItem();
				})
				.catch((getItemError) => {
					console.log(
						"ItemDisplayComponent: could not get item based on branchItem"
					);
				});
		}

		this.isCustomerItemActive()
			.then(() => {
				this.view = true;
			})
			.catch(() => {
				this.view = true;
			});

		this.checkIfAlreadyHaveItem();
	}

	private checkIfAlreadyHaveItem() {
		let itemId = "";

		if (this.item) {
			itemId = this.item.id;
		} else if (this.branchItem) {
			itemId = this.branchItem.item as string;
		} else {
			return;
		}

		this._userCustomerItemService
			.alreadyHaveItem(itemId)
			.then((haveItem: boolean) => {
				this.alreadyHaveItem = haveItem;
				if (haveItem && !this._cartService.isCustomerItem(itemId)) {
					this._cartService.remove(itemId); // should remove itself if it is apart of cart for some reason
				} else {
					this.checkIfAlreadyOrdered(itemId);
				}
			})
			.catch((err) => {
				console.log(
					"UserOrderService: could not check if user already have customer item",
					err
				);
				this.checkIfAlreadyOrdered(itemId);
			});
	}

	private checkIfAlreadyOrdered(itemId: string) {
		this._userOrderService
			.alreadyHaveOrderedItem(itemId)
			.then((haveOrdered: boolean) => {
				this.alreadyOrdered = haveOrdered;

				if (haveOrdered && !this._cartService.isCustomerItem(itemId)) {
					this._cartService.remove(itemId); // should remove itself if it is apart of cart for some reason
				}
			})
			.catch((alreadyOrderedError) => {
				console.log(
					"UserOrderService: could not check if user already have item",
					alreadyOrderedError
				);
			});
	}

	public onOrderItemActionChange(action: {
		action: OrderItemType;
		period: Period;
	}) {
		setTimeout(() => {
			// UUUgly, Expression changed after view init
			this.showAdd = true;
			this.orderItemAction = action;
		}, 0);
	}

	public isCustomerItemActive(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this._userService
				.isCustomerItemActive(this.item.id)
				.then(() => {
					this.customerItemActive = true;
					resolve(true);
				})
				.catch(() => {
					this.customerItemActive = false;
					reject(false);
				});
		});
	}

	public isCustomerItem(): boolean {
		return !!this.customerItem;
	}

	public getAmountLeftToPay(): number {
		return this._priceService.calculatePartlyPaymentAmountLeftToPay(
			this.item.price,
			this.orderItemAction.period
		);
	}

	public getPrice(): number {
		if (!this.orderItemAction) {
			return -1;
		}
		switch (this.orderItemAction.action) {
			case "buyout":
				return this._priceService.calculateCustomerItemUnitPrice(
					this.customerItem,
					this.item,
					this.branch,
					this.orderItemAction.action
				);
			case "extend":
				return this._priceService.calculateCustomerItemUnitPrice(
					this.customerItem,
					this.item,
					this.branch,
					this.orderItemAction.action
				);
			default:
				return this._priceService.calculateItemUnitPrice(
					this.item,
					this.branch,
					this.orderItemAction.action,
					this.orderItemAction.period
				);
		}
	}
}
