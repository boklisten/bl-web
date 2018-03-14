import {Injectable} from '@angular/core';
import {Branch, CustomerItem, Item, Order, OrderItem} from "bl-model";
import {BranchService} from "bl-connect";
import {BranchStoreService} from "../branch/branch-store.service";
import {UserService} from "../user/user.service";
import {PriceService} from "../price/price.service";
import {createUrlTree} from "@angular/router/src/create_url_tree";


type CartItem = {item: Item, orderItem: OrderItem, customerItem?: CustomerItem, branch?: Branch};

@Injectable()
export class CartService {

private _cart: CartItem[];

	constructor(private _branchStoreService: BranchStoreService, private _userService: UserService, private _priceService: PriceService) {
		this._cart = [];
	}
	
	
	public add(item: Item, orderItemType: "one" | "two" | "buy") {
		const orderItem: OrderItem = {} as OrderItem;
		orderItem.item = item.id;
		orderItem.title = item.title;
		orderItem.unitPrice = item.price;
		orderItem.taxAmount = 0;
		orderItem.taxRate = 0;
		orderItem.discount = 0;
		
		if (orderItemType === "one") {
			orderItem.type = "rent";
			orderItem.amount = this._priceService.oneSemester(item);
			orderItem.rentInfo = {
				oneSemester: true,
				twoSemesters: false
			};
		} else if (orderItemType === "two") {
			orderItem.type = "rent";
			orderItem.amount = this._priceService.twoSemesters(item);
			orderItem.rentInfo = {
				oneSemester: false,
				twoSemesters: true
			};
		} else if (orderItemType === "buy") {
			orderItem.type = "buy";
			orderItem.amount = item.price;
			orderItem.rentInfo = null;
		}
		
		this._cart.push({item: item, orderItem: orderItem});
	}
	
	public addCustomerItemExtend(customerItem: CustomerItem, item: Item, branch: Branch) {
		
		const orderItem: OrderItem = {} as OrderItem;
		orderItem.item = customerItem.item;
		orderItem.title = item.title;
		orderItem.unitPrice = item.price;
		orderItem.customerItem = customerItem.id;
		orderItem.amount = this._priceService.extendPrice(customerItem, branch);
		orderItem.taxAmount = 0;
		orderItem.taxRate = 0;
		orderItem.type = "extend";
		orderItem.discount = 0;
		
		this._cart.push({item: item, orderItem: orderItem, customerItem: customerItem, branch: branch});
	}
	
	public addCustomerItemBuyout(customerItem: CustomerItem, item: Item, branch: Branch) {
		const orderItem: OrderItem = {} as OrderItem;
		orderItem.item = customerItem.item;
		orderItem.unitPrice = item.price;
		orderItem.taxAmount = 0;
		orderItem.taxRate = 0;
		orderItem.title = item.title;
		orderItem.customerItem = customerItem.id;
		orderItem.amount = this._priceService.buyoutPrice(customerItem, item);
		orderItem.type = "buyout";
		orderItem.discount = 0;
		
		this._cart.push({item: item, orderItem: orderItem, customerItem: customerItem, branch: branch});
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
	
	public containsCustomerItem(itemId: string): boolean {
		for (let i = 0; i < this._cart.length; i++) {
			if (this._cart[i].item.id === itemId && this._cart[i].customerItem) {
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
			order.payments = [];
			
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
	
	public updateType(itemId: string, type: "one" | "two" | "buy" | "buyout" | "extend") {
		for (const cartItem of this._cart) {
			if (cartItem.item.id === itemId) {
				switch (type) {
					case "one":
						this.updateTypeOneSemester(cartItem);
						break;
					case "two":
						this.updateTypeTwoSemesters(cartItem);
						break;
					case "buy":
						this.updateTypeBuy(cartItem);
						break;
					case "buyout":
						this.updateTypeBuyout(cartItem);
						break;
					case "extend":
						this.updateTypeExtend(cartItem);
						break;
				}
			}
		
		}
	}
	
	private updateTypeBuyout(cartItem: CartItem) {
		cartItem.orderItem.rentInfo = null;
		cartItem.orderItem.type = "buyout";
		cartItem.orderItem.amount = this._priceService.buyoutPrice(cartItem.customerItem, cartItem.item);
	}
	
	private updateTypeExtend(cartItem: CartItem) {
		cartItem.orderItem.rentInfo = null;
		cartItem.orderItem.type = "extend";
		cartItem.orderItem.amount = this._priceService.extendPrice(cartItem.customerItem, cartItem.branch);
	}
	
	private updateTypeBuy(cartItem: CartItem) {
		cartItem.orderItem.rentInfo = null;
		cartItem.orderItem.type = "buy";
		cartItem.orderItem.amount = cartItem.orderItem.unitPrice;
	}
	
	private updateTypeOneSemester(cartItem: CartItem) {
		this.addRentInfo(cartItem);
		cartItem.orderItem.rentInfo.oneSemester = true;
		cartItem.orderItem.rentInfo.twoSemesters = false;
		cartItem.orderItem.amount = this._priceService.oneSemester(cartItem.item);
		cartItem.orderItem.type = "rent";
	}
	
	private updateTypeTwoSemesters(cartItem: CartItem) {
		this.addRentInfo(cartItem);
		cartItem.orderItem.rentInfo.oneSemester = false;
		cartItem.orderItem.rentInfo.twoSemesters = true;
		cartItem.orderItem.amount = this._priceService.twoSemesters(cartItem.item);
		cartItem.orderItem.type = "rent";
	}
	
	private addRentInfo(cartItem: CartItem) {
		if (!cartItem.orderItem.rentInfo) {
			cartItem.orderItem.rentInfo = {oneSemester: false, twoSemesters: false};
		}
	}
	
	public emptyCart() {
		this._cart = [];
	}
}
