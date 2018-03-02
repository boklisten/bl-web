import {Component, OnInit} from '@angular/core';
import {BranchService, ItemService} from "bl-connect";
import {BlApiError, Branch, Item, UserDetail} from "bl-model";
import {CartService} from "../../cart/cart.service";
import {Router} from "@angular/router";
import {BranchStoreService} from "../../branch/branch-store.service";
import {UserService} from "../../user/user.service";

@Component({
	selector: 'app-item-select',
	templateUrl: './item-select.component.html',
	styleUrls: ['./item-select.component.scss']
})
export class ItemSelectComponent implements OnInit {
	public items: Item[];
	public branch: Branch;
	
	constructor(private _itemService: ItemService, private _branchService: BranchService, private _cartService: CartService,
				private _router: Router, private _branchStoreService: BranchStoreService, private _userServie: UserService) {
		
	}
	
	ngOnInit() {
		if (!this._branchStoreService.getCurrentBranch()) {
			this._userServie.getUserDetail().then((userDetail: UserDetail) => {
				this._branchService.getById(userDetail.branch).then((branch: Branch) => {
					this._branchStoreService.setCurrentBranch(branch);
					this.branch = branch;
				}).catch(() => {
					console.log('ItemSelectComponent: could not get branch');
				});
			}).catch(() => {
				console.log('ItemSelectComponent: could not get user details');
				this._router.navigateByUrl('b/set');
			});
		} else {
			this.branch = this._branchStoreService.getCurrentBranch();
			this._itemService.getManyByIds(this.branch.items).then((items: Item[]) => {
				this.items = items;
			}).catch((blApiErr: BlApiError) => {
				console.log('ItemSelectComponent: could not get items for branch');
			});
		}
	}
	
	
	
	public onBranchClick() {
		this._router.navigateByUrl('/b/info/' + this.branch.id);
	}
	
	public showNavigateToCart(): boolean {
		return (this._cartService.getCart().length > 0);
	}
	
	public numOfItemsInCart(): number {
		return this._cartService.getCart().length;
	}
	
	public onCartClick() {
		this._router.navigateByUrl('/cart');
	}
}
