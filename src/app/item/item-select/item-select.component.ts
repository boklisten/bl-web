import {Component, OnInit} from '@angular/core';
import {BranchService, ItemService} from "bl-connect";
import {BlApiError, Branch, Item} from "bl-model";
import {CartService} from "../../cart/cart.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-item-select',
	templateUrl: './item-select.component.html',
	styleUrls: ['./item-select.component.scss']
})
export class ItemSelectComponent implements OnInit {
	public items: Item[];
	public branch: Branch;
	
	constructor(private _itemService: ItemService, private _branchService: BranchService, private _cartSevice: CartService, private _router: Router) {
	}
	
	ngOnInit() {
		this.testGetBranch();
	}
	
	private testGetBranch() {
		this._branchService.get().then((branches: Branch[]) => {
			this.onBranchSelect(branches[0]);
		}).catch((blApiError: BlApiError) => {
			console.log('error getting testGetBranch: ', blApiError);
		});
	}
	
	onBranchSelect(branch: Branch) {
		this.branch = branch;
		this._itemService.getManyByIds(branch.items).then((items: Item[]) => {
			this.items = items;
		}).catch((blApiError: BlApiError) => {
			console.log('the error', blApiError);
		});
	}
	
	public showNavigateToCart(): boolean {
		return (this._cartSevice.getCart().length > 0);
	}
	
	public numOfItemsInCart(): number {
		return this._cartSevice.getCart().length;
	}
	
	public onCartClick() {
		this._router.navigateByUrl('/cart');
	}
	
}
