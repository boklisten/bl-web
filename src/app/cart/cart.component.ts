import {Component, OnInit} from '@angular/core';
import {CartService} from "./cart.service";
import {BlApiError, Branch, Item, Order, OrderItem} from "bl-model";
import {BranchService, ItemService, OrderService} from "bl-connect";
import {BranchStoreService} from "../branch/branch-store.service";
import {UserService} from "../user/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
	public showPrice: boolean;
	
	constructor(private _cartService: CartService, private _branchService: BranchService, private _itemService: ItemService,
				private _branchStoreService: BranchStoreService, private _userService: UserService, private _orderService: OrderService,
				private _router: Router, private _route: ActivatedRoute) {
		
	}
	
	ngOnInit() {
	/*
		this._branchService.getById("5a1d67cdf14cbe78ff047d00").then((branch: Branch) => {
			this._branchStoreService.setCurrentBranch(branch);
			
			this._itemService.getById("5a1d67cdf14cbe78ff047d02").then((item: Item) => {
				this._cartService.add(item);
			}).catch(() => {
				console.log('could not get item');
			});
		}).catch(() => {
			console.log('could not get branch');
		});
		*/
	}
	
	public showCart(): boolean {
		return (this.getCart().length > 0);
	}
	
	public getCart(): {item: Item, orderItem: OrderItem}[] {
		return this._cartService.getCart();
	}
	
	public onRemove(itemId: string) {
		this._cartService.remove(itemId);
	}
	
	public getTotalPrice(): number {
		return this._cartService.getTotalPrice();
	}
	
	public onPayment() {
		let order = this._cartService.createOrder();
		this._cartService.emptyCart();
		console.log('the order is like this: ', order);
		
		this._orderService.add(order).then((apiOrder: Order) => {
			console.log('we got the order back from api!', apiOrder);
			this._router.navigateByUrl('/u/order');
		}).catch((apiError: BlApiError) => {
			console.log('we got an error from api', apiError);
		});
	}
	
}
