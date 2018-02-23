import {Injectable} from '@angular/core';
import {Item, Order, OrderItem} from "bl-model";
import {BranchService} from "bl-connect";
import {BranchStoreService} from "../branch/branch-store.service";
import {UserService} from "../user/user.service";
import {PriceService} from "../price/price.service";

@Injectable()
export class CartService {

private _cart: {item: Item, orderItem: OrderItem}[];

constructor(private _branchStoreService: BranchStoreService, private _userService: UserService, private _priceService: PriceService) {
		this._cart = [];
	}
	
	
	public add(item: Item) {
		const orderItem: OrderItem = {} as OrderItem;
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
		this._cart.push({item: item, orderItem: orderItem});
	}
	
	public remove(itemId: string) {
		for (let i = 0; i < this._cart.length; i++) {
			if (this._cart[i].item.id === itemId) {
				this._cart.splice(i, 1);
			}
		}
	}
	
	public contains(itemId: string): boolean {
		for (let i = 0; i < this._cart.length; i++) {
			if (this._cart[i].item.id === itemId) {
				return true;
			}
		}
		return false;
	}
	
	public getTotalPrice(): number {
		let sum = 0;
		
		for (const cartItem of this._cart) {
			sum += cartItem.orderItem.amount;
		}
		return sum;
	}
	
	public isEmpty(): boolean {
		return !(this._cart.length > 0);
	}
	
	public getCart(): {item: Item, orderItem: OrderItem}[] {
		return this._cart;
	}
	
	public getOrderItems(): OrderItem[] {
		const orderItems: OrderItem[] = [];
		
		for (const cartItem of this._cart) {
			orderItems.push(cartItem.orderItem);
		}
		
		return orderItems;
	}
	
	public createOrder(): Order {
		const order: Order = {} as Order;
		
		if (this._cart.length > 0) {
			order.amount = this.getTotalPrice();
			order.branch = this._branchStoreService.getCurrentBranch().id;
			order.customer = this._userService.getUserDetailId();
			order.orderItems = this.getOrderItems();
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
			if (this._cart[i].item.id === itemId) {
				return this._cart[i].orderItem;
			}
		}
	}
	
	public updateType(itemId: string, type: "one" | "two" | "buy") {
		for (const cartItem of this._cart) {
			if (cartItem.item.id === itemId) {
				if (type !== "buy") {
					if (!cartItem.orderItem.rentInfo) {
						cartItem.orderItem.rentInfo = {oneSemester: false, twoSemesters: false};
					}
					
					if (type === "one") {
						cartItem.orderItem.rentInfo.oneSemester = true;
						cartItem.orderItem.rentInfo.twoSemesters = false;
						cartItem.orderItem.amount = this._priceService.oneSemester(cartItem.item);
						
					}
					
					if (type === "two") {
						cartItem.orderItem.rentInfo.oneSemester = false;
						cartItem.orderItem.rentInfo.twoSemesters = true;
						cartItem.orderItem.amount = this._priceService.twoSemesters(cartItem.item);
					}
					cartItem.orderItem.type = "rent";
				} else {
					cartItem.orderItem.rentInfo = null;
					cartItem.orderItem.type = "buy";
					cartItem.orderItem.amount = cartItem.orderItem.unitPrice;
				}
			}
		}
	}
	
	public emptyCart() {
		this._cart = [];
	}
}
