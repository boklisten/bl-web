import {Injectable} from '@angular/core';
import {Item, Order, OrderItem} from "bl-model";
import {BranchService} from "bl-connect";
import {BranchStoreService} from "../branch/branch-store.service";
import {UserService} from "../user/user.service";

@Injectable()
export class CartService {

private _cart: OrderItem[];

constructor(private _branchStoreService: BranchStoreService, private _userService: UserService) {
		this._cart = [];
	}
	
	
	public add(item: Item) {
		let orderItem: OrderItem = {} as OrderItem;
		orderItem.item = item.id;
		orderItem.amount = 0;
		orderItem.title = item.title;
		orderItem.unitPrice = item.price;
		orderItem.discount = 0;
		this._cart.push(orderItem);
	}
	
	public remove(itemId: string) {
		for (let i = 0; i < this._cart.length; i++) {
			if (this._cart[i].item === itemId) {
				this._cart.splice(i, 1);
			}
		}
	}
	
	public contains(itemId: string): boolean {
		for (let i = 0; i < this._cart.length; i++) {
			if (this._cart[i].item === itemId) {
				return true;
			}
		}
		return false;
	}
	
	public getTotalPrice(): number {
		let sum = 0;
		
		for (const orderItem of this._cart) {
			sum += orderItem.amount;
		}
		return sum;
	}
	
	public isEmpty(): boolean {
		return !(this._cart.length > 0);
	}
	
	public getCart(): OrderItem[] {
		return this._cart;
	}
	
	public createOrder(): Order {
		const order: Order = {} as Order;
		order.amount = this.getTotalPrice();
		order.branch = this._branchStoreService.getCurrentBranch().id;
		order.customer = this._userService.getUserName();
		order.orderItems = this._cart;
		order.application = 'bl-web';
		order.byCustomer = true;
		order.payments = [];
		
		return order;
	}
}
