import {Component, Input, OnInit} from '@angular/core';
import {BlApiError, Branch, BranchItem, CustomerItem, Item} from "@wizardcoder/bl-model";
import {BranchService, ItemService} from "@wizardcoder/bl-connect";
import {Router} from "@angular/router";
import {CartService} from "../../cart/cart.service";
import {DateService} from "../../date/date.service";

@Component({
	selector: 'app-user-customer-item',
	templateUrl: './user-customer-item.component.html',
	styleUrls: ['./user-customer-item.component.scss']
})
export class UserCustomerItemComponent implements OnInit {

	@Input() customerItem: CustomerItem;
	@Input() branchItem: BranchItem;
	public item: Item;
	public branch: Branch;
	public extend: boolean;
	public buyout: boolean;

	constructor(private _itemService: ItemService, private _router: Router, private _branchService: BranchService,
				private _cartService: CartService, private _dateService: DateService) {
		this.extend = false;
		this.buyout = false;
	}

	ngOnInit() {
		this._itemService.getById(this.customerItem.item).then((item: Item) => {
			this.item = item;
			this.initByCart();
		}).catch((itemBlApiErr: BlApiError) => {
			console.log('userCustomerItemComponent: could not get item', itemBlApiErr);
		});


		this._branchService.getById(this.customerItem.handoutInfo.handoutById).then((branch: Branch) => {
			this.branch = branch;
		}).catch((branchBlApiErr: BlApiError) => {
			console.log('userCustomerItemComponent: could not get branch', branchBlApiErr);
		});
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
		this._cartService.addCustomerItemExtend(this.customerItem, this.item, this.branchItem, this.branch);
	}

	onBuyoutClick() {
		this.removeCustomerItem();
		this.extend = false;

		if (this.buyout) {
			this.buyout = false;
			return;
		}

		this.buyout = true;
		this._cartService.addCustomerItemBuyout(this.customerItem, this.branchItem, this.item, this.branch);
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
