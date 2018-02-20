import {Component, OnInit} from '@angular/core';
import {CartService} from "./cart.service";
import {Branch, Item, Order, OrderItem} from "bl-model";
import {BranchService, ItemService} from "bl-connect";
import {BranchStoreService} from "../branch/branch-store.service";
import {UserService} from "../user/user.service";

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
	public showPrice: boolean;
	
	constructor(private _cartService: CartService, private _branchService: BranchService, private _itemService: ItemService,
				private _branchStoreService: BranchStoreService, private _userService: UserService) {
		this._branchService.getById("5a1d67cdf14cbe78ff047d00").then((branch: Branch) => {
			
			this._branchStoreService.setCurrentBranch(branch);
			this.showPrice = !this._branchStoreService.getCurrentBranch().payment.branchResponsible;
			
			this._itemService.getManyByIds(branch.items).then((items: Item[]) => {
				for (const item of items) {
					this._cartService.add(item);
				}
			}).catch(() =>  {
			
			});
		}).catch(() => {
		
		});
	}
	
	ngOnInit() {
	}
	
	public getCart(): OrderItem[] {
		return this._cartService.getCart();
	}
	
	public getTotalPrice(): number {
		return this._cartService.getTotalPrice();
	}
	
	public onPayment() {
		let order = this._cartService.createOrder();
		console.log('the order is like this: ', order);
	}
	
}
