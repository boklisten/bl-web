import {Component, Input, OnInit} from '@angular/core';
import {BlApiError, Branch, CustomerItem, Item} from "bl-model";
import {BranchService, ItemService} from "bl-connect";
import {Router} from "@angular/router";

@Component({
	selector: 'app-user-customer-item',
	templateUrl: './user-customer-item.component.html',
	styleUrls: ['./user-customer-item.component.scss']
})
export class UserCustomerItemComponent implements OnInit {
	
	@Input() customerItem: CustomerItem;
	public item: Item;
	public branch: Branch;
	
	constructor(private _itemService: ItemService, private _router: Router, private _branchService: BranchService) {
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
	
	onItemClick() {
		this._router.navigateByUrl('i/' + this.item.id);
	}
	
	onDeliverClick() {
		this._router.navigateByUrl('b/info/' + this.customerItem.handoutBranch);
	}
	
	
	
}
