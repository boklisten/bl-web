import {Injectable} from '@angular/core';
import {Item} from "bl-model";

@Injectable()
export class CartService {
	
	private _cart: Item[];
	
	constructor() {
		this._cart = [];
	}
	
	
	public add(item: Item) {
		this._cart.push(item);
	}
	
	public remove(item: Item) {
		const index = this._cart.indexOf(item);
		
		if (index > -1) {
			this._cart.splice(index, 1);
		}
	}
	
	public contains(item: Item): boolean {
		if (this._cart.indexOf(item) > -1) {
			return true;
		}
		return false;
	}
	
	public isEmpty(): boolean {
		if (this._cart.length > 0) {
			return false;
		}
		return true;
	}
	
	public getCart(): Item[] {
		return this._cart;
	}
	
}
