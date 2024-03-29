import { Component, Input, OnInit } from "@angular/core";
import {
	BlApiError,
	Branch,
	BranchItem,
	CustomerItem,
	Item,
} from "@boklisten/bl-model";
import {
	BranchService,
	CustomerItemService,
	ItemService,
} from "@boklisten/bl-connect";
import { Router } from "@angular/router";
import { CartService } from "../../cart/cart.service";
import { DateService } from "../../date/date.service";
import { BranchStoreService } from "../../branch/branch-store.service";
import { UserCustomerItemService } from "./user-customer-item.service";

@Component({
	selector: "app-user-customer-item",
	templateUrl: "./user-customer-item.component.html",
	styleUrls: ["./user-customer-item.component.scss"],
})
export class UserCustomerItemComponent implements OnInit {
	@Input() customerItem: CustomerItem;
	@Input() selectedBranchId: string;
	public item: Item;
	public branch: Branch;
	public extend: boolean;
	public buyout: boolean;
	public canExtend: boolean;
	public canBuyout: boolean;
	private _branchItem: BranchItem;
	public correctBranch: boolean;
	public notReturnedBeforeDeadline: boolean;
	public returned: boolean;
	public handoutBranch: Branch;

	constructor(
		private _itemService: ItemService,
		private _router: Router,
		private _branchService: BranchService,
		private _cartService: CartService,
		private _dateService: DateService,
		private _branchStoreService: BranchStoreService,
		private _userCustomerItemService: UserCustomerItemService
	) {
		this.extend = false;
		this.buyout = false;
		this.correctBranch = false;
		this.canExtend = false;
		this.canBuyout = false;
		this.notReturnedBeforeDeadline = false;
		this.returned = false;
	}

	async ngOnInit() {
		if (this.customerItem) {
			if (!this.item) {
				try {
					this.item = await this._itemService.getById(
						this.customerItem.item as string,
						{ fresh: true }
					);
					this.initByCart();
					await this.setValidOptions();
				} catch (itemBlApiErr: unknown) {
					console.log(
						"userCustomerItemComponent: could not get item",
						itemBlApiErr
					);
				}
			} else {
				await this.setValidOptions();
			}

			this.notReturnedBeforeDeadline = this._userCustomerItemService.isNotReturnedBeforeDeadline(
				this.customerItem
			);
			this.returned = this.customerItem.returned;
		}
	}

	async setValidOptions() {
		let branchItem: BranchItem;
		if (this._branchStoreService.haveBranchItem(this.item.id)) {
			branchItem = this._branchStoreService.getBranchItem(this.item.id);
		}
		this.branch = this._branchStoreService.getBranch();

		if (
			this._userCustomerItemService.isOnValidBranch(
				this.customerItem,
				branchItem
			)
		) {
			this.correctBranch = true;

			this.canExtend = this._userCustomerItemService.isExtendValid(
				this.customerItem
			);
			this.canBuyout = this._userCustomerItemService.isBuyoutValid(
				this.customerItem
			);
		} else {
			this.correctBranch = false;

			this.handoutBranch = await this._branchService.getById(
				this.customerItem.handoutInfo.handoutById
			);
		}
	}

	initByCart() {
		if (this._cartService.contains(this.item.id)) {
			const orderItem = this._cartService.get(this.item.id);

			if (orderItem.type === "extend") {
				this.extend = true;
			} else if (orderItem.type === "buyout") {
				this.buyout = true;
			}
		}
	}

	onExtendClick() {
		this.removeCustomerItem();
		this.buyout = false;

		if (this.extend) {
			this.extend = false;
			return;
		}

		this.extend = true;
		this._cartService.addCustomerItemExtend(
			this.customerItem,
			this.item,
			this._branchItem,
			this.branch
		);
	}

	onBuyoutClick() {
		this.removeCustomerItem();
		this.extend = false;

		if (this.buyout) {
			this.buyout = false;
			return;
		}

		this.buyout = true;
		this._cartService.addCustomerItemBuyout(
			this.customerItem,
			this._branchItem,
			this.item,
			this.branch
		);
	}

	removeCustomerItem() {
		if (this._cartService.contains(this.item.id)) {
			this._cartService.remove(this.item.id);
			return;
		}
	}
}
