import {Component, Input, OnInit} from '@angular/core';
import {BlApiError, Branch, CustomerItem, Item} from "bl-model";
import {BranchService, ItemService} from "bl-connect";
import {Router} from "@angular/router";
import {CartService} from "../../cart/cart.service";

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
	
	constructor(private _itemService: ItemService, private _router: Router, private _branchService: BranchService, private _cartService: CartService) {
		this.extend = false;
		this.buyout = false;
	}
	
	ngOnInit() {
		this._itemService.getById(this.customerItem.item).then((item: Item) => {
			this.item = item;
		}).catch((itemBlApiErr: BlApiError) => {
			console.log('userCustomerItemComponent: could not get item', itemBlApiErr);
		});
		
		this._branchService.getById(this.customerItem.handoutBranch).then((branch: Branch) => {
			this.branch = branch;
		}).catch((branchBlApiErr: BlApiError) => {
			console.log('userCustomerItemComponent: could not get branch', branchBlApiErr);
		});
	}
	
	isCustomerItemAdded(): boolean {
		if (!this.item) {
			return false;
		}
		return this._cartService.contains(this.item.id);
	}
	
	onItemClick() {
		this._router.navigateByUrl('i/' + this.item.id);
	}
	
	onDeliverClick() {
		this._router.navigateByUrl('b/info/' + this.customerItem.handoutBranch);
	}
	
	onExtendClick() {
		this.removeCustomerItem();
		this.buyout = false;
		
		if (this.extend) {
			this.extend = false;
			return;
		}
		
		this.extend = true;
		this._cartService.addCustomerItemExtend(this.customerItem, this.item, this.branch);
	}
	
	onBuyoutClick() {
		this.removeCustomerItem();
		this.extend = false;
		
		if (this.buyout) {
			this.buyout = false;
			return;
		}
		
		this.buyout = true;
		this._cartService.addCustomerItemBuyout(this.customerItem, this.item, this.branch);
	}
	
	removeCustomerItem() {
		if (this._cartService.contains(this.item.id)) {
			this._cartService.remove(this.item.id);
			return;
		}
	}
	
	
	
}
