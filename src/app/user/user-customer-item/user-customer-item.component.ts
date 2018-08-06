import {Component, Input, OnInit} from '@angular/core';
import {BlApiError, Branch, BranchItem, CustomerItem, Item} from "@wizardcoder/bl-model";
import {BranchService, CustomerItemService, ItemService} from "@wizardcoder/bl-connect";
import {Router} from "@angular/router";
import {CartService} from "../../cart/cart.service";
import {DateService} from "../../date/date.service";
import {BranchStoreService} from "../../branch/branch-store.service";
import {UserCustomerItemService} from "./user-customer-item.service";

@Component({
	selector: 'app-user-customer-item',
	templateUrl: './user-customer-item.component.html',
	styleUrls: ['./user-customer-item.component.scss']
})
export class UserCustomerItemComponent implements OnInit {

	@Input() customerItem: CustomerItem;
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

	constructor(private _itemService: ItemService,
				private _router: Router,
				private _branchService: BranchService,
				private _cartService: CartService,
				private _dateService: DateService,
				private _branchStoreService: BranchStoreService,
				private _userCustomerItemService: UserCustomerItemService) {

		this.extend = false;
		this.buyout = false;
		this.correctBranch = false;
		this.canExtend = false;
		this.canBuyout = false;
		this.notReturnedBeforeDeadline = false;
		this.returned = false;
	}

	ngOnInit() {
		if (this.customerItem) {
			if (!this.item) {
				this._itemService.getById(this.customerItem.item).then((item: Item) => {
					this.item = item;
					this.initByCart();
					this.setValidOptions();
				}).catch((itemBlApiErr: BlApiError) => {
					console.log('userCustomerItemComponent: could not get item', itemBlApiErr);
				});
			} else {
				this.setValidOptions();
			}

			this.branch = this._branchStoreService.getBranch();

			this.notReturnedBeforeDeadline = this._userCustomerItemService.isNotReturnedBeforeDeadline(this.customerItem);
			this.returned = this.customerItem.returned;

		}
	}

	setValidOptions() {
		let branchItem: BranchItem;
		if (this._branchStoreService.haveBranchItem(this.item.id)) {
			branchItem = this._branchStoreService.getBranchItem(this.item.id);
		}

		if (this._userCustomerItemService.isOnValidBranch(this.customerItem, branchItem)) {
			this.correctBranch = true;

			if (branchItem) {
				this._userCustomerItemService.isExtendValid(branchItem, this.customerItem).then((canExtend) => {
					this.canExtend = canExtend;
				}).catch(() => {
					this.canExtend = false;
				});

				this.canBuyout = this._userCustomerItemService.isBuyoutValid(branchItem, this.customerItem);
			}
		} else {
			this.correctBranch = false;
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
		this._cartService.addCustomerItemExtend(this.customerItem, this.item, this._branchItem, this.branch);
	}

	onBuyoutClick() {
		this.removeCustomerItem();
		this.extend = false;

		if (this.buyout) {
			this.buyout = false;
			return;
		}

		this.buyout = true;
		this._cartService.addCustomerItemBuyout(this.customerItem, this._branchItem, this.item, this.branch);
	}

	removeCustomerItem() {
		if (this._cartService.contains(this.item.id)) {
			this._cartService.remove(this.item.id);
			return;
		}
	}



}
