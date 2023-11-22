import { Component, Input, OnInit } from "@angular/core";
import {
	Branch,
	BranchItem,
	CustomerItem,
	Item,
	Period,
} from "@boklisten/bl-model";
import { CartService } from "../../cart/cart.service";
import { Router } from "@angular/router";
import { PriceService } from "../../price/price.service";
import { UserService } from "../../user/user.service";
import { ItemService } from "@boklisten/bl-connect";
import { OrderItemType } from "@boklisten/bl-model";
import { UserOrderService } from "../../user/order/user-order/user-order.service";
import { UserCustomerItemService } from "../../user/user-customer-item/user-customer-item.service";
import { AuthLoginService } from "@boklisten/bl-login";

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

	public wait = true;

	constructor(
		private _router: Router,
		private _priceService: PriceService,
		private _userService: UserService,
		private _userCustomerItemService: UserCustomerItemService,
		private _userOrderService: UserOrderService,
		private _itemService: ItemService,
		private _cartService: CartService,
		private _authService: AuthLoginService
	) {
		this.customerItemActive = false;
		this.view = false;
		this.showAdd = false;
		this.alreadyHaveItem = false;
		this.period = "semester";
	}

	async ngOnInit() {
		if (this.branchItem && !this.item) {
			try {
				this.item = await this._itemService.getById(
					this.branchItem.item as string
				);
				await this.checkIfAlreadyHaveItem();
			} catch (getItemError) {
				console.log(
					"ItemDisplayComponent: could not get item based on branchItem"
				);
			}
		}

		try {
			await this.isCustomerItemActive();
		} catch (error) {
			console.log(error);
		} finally {
			this.view = true;
		}

		await this.checkIfAlreadyHaveItem();
	}

	private async checkIfAlreadyHaveItem() {
		if (!this._authService.isLoggedIn()) {
			this.wait = false;
			return;
		}

		let itemId = "";

		if (this.item) {
			itemId = this.item.id;
		} else if (this.branchItem) {
			itemId = this.branchItem.item as string;
		} else {
			return;
		}

		try {
			this.alreadyHaveItem =
				(await this._userCustomerItemService.alreadyHaveItem(itemId)) &&
				!this._userCustomerItemService.isExtendableCustomerItem(itemId);
			if (
				this.alreadyHaveItem &&
				!this._cartService.isCustomerItem(itemId)
			) {
				this._cartService.remove(itemId); // should remove itself if it is apart of cart for some reason
				this.wait = false;
			} else {
				await this.checkIfAlreadyOrdered(itemId);
			}
		} catch (error) {
			console.log(
				"UserOrderService: could not check if user already have customer item",
				error
			);
			await this.checkIfAlreadyOrdered(itemId);
		}
	}

	private async checkIfAlreadyOrdered(itemId: string) {
		try {
			const haveOrdered = await this._userOrderService.alreadyHaveOrderedItem(
				itemId
			);
			this.alreadyOrdered = haveOrdered;

			if (haveOrdered && !this._cartService.isCustomerItem(itemId)) {
				this._cartService.remove(itemId); // should remove itself if it is apart of cart for some reason
			}
			this.wait = false;
		} catch (alreadyOrderedError) {
			console.log(
				"UserOrderService: could not check if user already have item",
				alreadyOrderedError
			);
			this.wait = false;
		}
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

	public async isCustomerItemActive(): Promise<boolean> {
		try {
			await this._userService.isCustomerItemActive(this.item.id);
			this.customerItemActive = true;
			return true;
		} catch (error) {
			this.customerItemActive = false;
		}
		return false;
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
