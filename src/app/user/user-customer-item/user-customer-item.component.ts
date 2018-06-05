import {Component, Input, OnInit} from '@angular/core';
import {BlApiError, Branch, BranchItem, CustomerItem, Item} from "@wizardcoder/bl-model";
import {BranchService, ItemService} from "@wizardcoder/bl-connect";
import {Router} from "@angular/router";
import {CartService} from "../../cart/cart.service";
import {DateService} from "../../date/date.service";
import {BranchStoreService} from "../../branch/branch-store.service";

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

	constructor(private _itemService: ItemService, private _router: Router, private _branchService: BranchService,
				private _cartService: CartService, private _dateService: DateService, private _branchStoreService: BranchStoreService) {
		this.extend = false;
		this.buyout = false;

	}

	ngOnInit() {
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


	}

	setValidOptions() {
		if (this._branchStoreService.haveBranchItem(this.item.id)) {
			this._branchItem = this._branchStoreService.getBranchItem(this.item.id);

			if (this._branchItem.rent) {
				this.canExtend = true;
			}

			if (this._branchItem.buy) {
				this.canBuyout = true;
			}
		} else {
			this.canExtend = false;
			this.canBuyout = false;
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

	isExpired(): boolean {
		return this._dateService.isDeadlineExpired(this.customerItem.deadline.toString());
	}

	removeCustomerItem() {
		if (this._cartService.contains(this.item.id)) {
			this._cartService.remove(this.item.id);
			return;
		}
	}



}
