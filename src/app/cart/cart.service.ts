import {Injectable} from '@angular/core';
import {Item, OrderItem} from "bl-model";
import {BranchService} from "bl-connect";

@Injectable()
export class CartService {
	
	private _cart: {item: Item, orderItem: OrderItem}[];
	
	constructor(private _branchService: BranchService) {
		this._cart = [];
	}
	
	
	public add(item: Item) {
		let orderItem: OrderItem = {} as OrderItem;
		orderItem.item = item.id;
		this._cart.push({item: item, orderItem: orderItem});
	}
	
	public removeItem(item: Item) {
		for (let i = 0; i < this._cart.length; i++) {
			if (this._cart[i].item === item) {
				this._cart.splice(i, 1);
			}
		}
	}
	
	public removeOrderItem(orderItem: OrderItem) {
		for (let i = 0; i < this._cart.length; i++) {
			if (this._cart[i].orderItem === orderItem) {
				this._cart.splice(i, 1);
			}
		}
	}
	
	public containsItem(item: Item): boolean {
		for (let i = 0; i < this._cart.length; i++) {
			if (this._cart[i].item === item) {
				return true;
			}
		}
		return false;
	}
	
	public containsOrderItem(orderItem: OrderItem): boolean {
		for (let i = 0; i < this._cart.length; i++) {
			if (this._cart[i].orderItem === orderItem) {
				return true;
			}
		}
		return false;
	}
	
	public isEmpty(): boolean {
		return (this._cart.length > 0);
	}
	
	public getCart(): {item: Item, orderItem: OrderItem}[] {
		return this._cart;
	}
}
