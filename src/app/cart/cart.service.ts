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
		orderItem.title = item.title;
		orderItem.amount = 0;
		orderItem.unitPrice = item.price;
		orderItem.taxAmount = 0;
		orderItem.taxRate = 0;
		orderItem.type = "rent";
		orderItem.discount = 0;
		orderItem.rentInfo = {
			oneSemester: true,
			twoSemesters: false
		};
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
		
		if (this._cart.length > 0) {
			order.amount = this.getTotalPrice();
			order.branch = this._branchStoreService.getCurrentBranch().id;
			order.customer = this._userService.getUserDetailId();
			order.orderItems = this._cart;
			order.application = 'bl-web';
			order.byCustomer = true;
			order.user = {
				id: this._userService.getUserId()
			};
			order.payments = [
				{
					method: "card",
					amount: this.getTotalPrice(),
					confirmed: false,
					time: new Date(),
					byBranch: false
				}
			];
			
		}
		
		return order;
	}
	
	public get(itemId: string): OrderItem {
		for (let i = 0; i < this._cart.length; i++) {
			if (this._cart[i].item === itemId) {
				return this._cart[i];
			}
		}
	}
	
	public updateType(itemId: string, type: "one" | "two" | "buy") {
		for (let cartItem of this._cart) {
			if (cartItem.item === itemId) {
				if (type !== "buy") {
					if (!cartItem.rentInfo) {
						cartItem.rentInfo = {oneSemester: false, twoSemesters: false}
					}
					
					if (type === "one") {
						cartItem.rentInfo.oneSemester = true;
						cartItem.rentInfo.twoSemesters = false;
					}
					
					if (type === "two") {
						cartItem.rentInfo.oneSemester = false;
						cartItem.rentInfo.twoSemesters = true;
					}
					cartItem.type = "rent";
				} else {
					cartItem.rentInfo = null;
					cartItem.type = "buy";
				}
			}
		}
	}
	
	public emptyCart() {
		this._cart = [];
	}
}
