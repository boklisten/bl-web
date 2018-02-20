import {Component, OnInit} from '@angular/core';
import {CartService} from "./cart.service";
import {Branch, Item, OrderItem} from "bl-model";
import {BranchService, ItemService} from "bl-connect";
import {BranchStoreService} from "../branch/branch-store.service";

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
	
	constructor(private _cartService: CartService, private _branchService: BranchService, private _itemService: ItemService,
				private _branchStoreService: BranchStoreService) {
		this._branchService.getById("5a1d67cdf14cbe78ff047d00").then((branch: Branch) => {
			this._branchStoreService.setCurrentBranch(branch);
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
	
	public getCart(): {item: Item, orderItem: OrderItem}[] {
		return this._cartService.getCart();
	}
	
}
