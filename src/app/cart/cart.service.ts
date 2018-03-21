import {Injectable} from '@angular/core';
import {BlApiError, Branch, CustomerItem, Item, Order, OrderItem} from "bl-model";
import {OrderService} from "bl-connect";
import {BranchStoreService} from "../branch/branch-store.service";
import {UserService} from "../user/user.service";
import {PriceService} from "../price/price.service";


type CartItem = {item: Item, orderItem: OrderItem, customerItem?: CustomerItem, branch?: Branch};

@Injectable()
export class CartService {

private _cart: CartItem[];
	private _currentOrder: Order;
	
	constructor(private _branchStoreService: BranchStoreService, private _userService: UserService,
				private _priceService: PriceService, private _orderService: OrderService) {
		this._cart = [];
	}
	
	
	public add(item: Item, orderItemType: "one" | "two" | "buy") {
		const orderItem: OrderItem = {} as OrderItem;
		orderItem.item = item.id;
		orderItem.title = item.title;
		orderItem.unitPrice = item.price;
		orderItem.taxAmount = 0;
		orderItem.taxRate = item.taxRate;
	/*
		orderItem.discount = {
			amount: 0
		};
	*/
		if (orderItemType === "one") {
			orderItem.type = "rent";
			orderItem.info = {
				from: new Date(),
				to: new Date(),
				numberOfPeriods: 1,
				periodType: "semester"
			};
			orderItem.amount = this._priceService.getOrderItemPrice(orderItem, item, this._branchStoreService.getCurrentBranch());
		} else if (orderItemType === "two") {
			orderItem.type = "rent";
			orderItem.info = {
				from: new Date(),
				to: new Date(),
				numberOfPeriods: 1,
				periodType: 'year'
			};
			orderItem.amount = this._priceService.getOrderItemPrice(orderItem, item, this._branchStoreService.getCurrentBranch());
		} else if (orderItemType === "buy") {
			orderItem.type = "buy";
			orderItem.amount = this._priceService.getOrderItemPrice(orderItem, item, this._branchStoreService.getCurrentBranch());
		}
		
		this._cart.push({item: item, orderItem: orderItem, branch: this._branchStoreService.getCurrentBranch()});
	}
	
	public addCustomerItemExtend(customerItem: CustomerItem, item: Item, branch: Branch) {
		const orderItem: OrderItem = {} as OrderItem;
		orderItem.item = customerItem.item;
		orderItem.title = item.title;
		orderItem.unitPrice = item.price;
		orderItem.amount = this._priceService.getOrderItemPrice(orderItem, item, this._branchStoreService.getCurrentBranch());
		orderItem.taxAmount = 0;
		orderItem.taxRate = 0;
		orderItem.type = "extend";
		orderItem.info = {
			from: new Date(),
			to: new Date(),
			numberOfPeriods: 1,
			periodType: "semester",
			customerItem: customerItem.id
		};
		
		this._cart.push({item: item, orderItem: orderItem, customerItem: customerItem, branch: branch});
	}
	
	public addCustomerItemBuyout(customerItem: CustomerItem, item: Item, branch: Branch) {
		const orderItem: OrderItem = {} as OrderItem;
		orderItem.item = customerItem.item;
		orderItem.unitPrice = item.price;
		orderItem.taxAmount = 0;
		orderItem.taxRate = 0;
		orderItem.title = item.title;
		orderItem.amount = this._priceService.getOrderItemPrice(orderItem, item, this._branchStoreService.getCurrentBranch());
		orderItem.type = "buyout";
		
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
	
	
	public getOrder(): Promise<Order> {
		const createdOrder = this.createOrder();
		
		if (!this._currentOrder) {
			return this._orderService.add(createdOrder).then((addedOrder: Order) => {
				console.log('we got a order back from api', addedOrder);
				this._currentOrder = addedOrder;
				return this._currentOrder;
			}).catch((blApiErr) => {
				return Promise.reject(blApiErr);
			});
		}
		
		if (createdOrder === this._currentOrder) {
			return Promise.resolve(this._currentOrder);
		}
		
		return this._orderService.update(this._currentOrder.id, createdOrder).then((updatedOrder: Order) => {
			this._currentOrder = updatedOrder;
			return updatedOrder;
		}).catch((blApiErr: BlApiError) => {
			return Promise.reject(blApiErr);
		});
	}
	
	private createOrder(): Order {
		const order: Order = {} as Order;
		
		if (this._cart.length > 0) {
			order.amount = this.getTotalPrice();
			order.branch = this._branchStoreService.getCurrentBranch().id;
			order.customer = this._userService.getUserDetailId();
			order.orderItems = this.getOrderItems();
			order.byCustomer = true;
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
		cartItem.orderItem.info = null;
		cartItem.orderItem.type = "buyout";
		cartItem.orderItem.amount = this._priceService.getOrderItemPrice(cartItem.orderItem, cartItem.item, cartItem.branch);
	}
	
	private updateTypeExtend(cartItem: CartItem) {
		cartItem.orderItem.info = {
			from: new Date(),
			to: new Date(),
			numberOfPeriods: 1,
			periodType: "semester",
			customerItem: cartItem.customerItem.id
		};
		cartItem.orderItem.type = "extend";
		cartItem.orderItem.amount = this._priceService.getOrderItemPrice(cartItem.orderItem, cartItem.item, cartItem.branch);
	}
	
	private updateTypeBuy(cartItem: CartItem) {
		cartItem.orderItem.info = null;
		cartItem.orderItem.type = "buy";
		cartItem.orderItem.amount = this._priceService.getOrderItemPrice(cartItem.orderItem, cartItem.item, cartItem.branch);
	}
	
	private updateTypeOneSemester(cartItem: CartItem) {
		cartItem.orderItem.info = {
			from: new Date(),
			to: new Date(),
			numberOfPeriods: 1,
			periodType: "semester"
		};
		cartItem.orderItem.amount = this._priceService.getOrderItemPrice(cartItem.orderItem, cartItem.item, cartItem.branch);
		cartItem.orderItem.type = "rent";
	}
	
	private updateTypeTwoSemesters(cartItem: CartItem) {
		cartItem.orderItem.info = {
			from: new Date(),
			to: new Date(),
			numberOfPeriods: 1,
			periodType: "semester"
		};
		cartItem.orderItem.amount = this._priceService.getOrderItemPrice(cartItem.orderItem, cartItem.item, cartItem.branch);
		cartItem.orderItem.type = "rent";
	}
	
	public emptyCart() {
		this._cart = [];
	}
}
