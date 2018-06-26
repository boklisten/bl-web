import {Injectable} from '@angular/core';
import {Branch, BranchItem, CustomerItem, Item, Order, OrderItem} from "@wizardcoder/bl-model";
import {BranchStoreService} from "../branch/branch-store.service";
import {UserService} from "../user/user.service";
import {PriceService} from "../price/price.service";
import {Subject} from "rxjs";
import {DateService} from "../date/date.service";
import {OrderItemType} from "@wizardcoder/bl-model/dist/order/order-item/order-item-type";


export interface CartItem {
	item: Item;
	branchItem: BranchItem;
	orderItem: OrderItem;
	customerItem?: CustomerItem;
	branch?: Branch;
}

@Injectable()
export class CartService {

private _cart: CartItem[];
	private cartChange$: Subject<boolean>;

	constructor(private _branchStoreService: BranchStoreService, private _userService: UserService,
				private _priceService: PriceService, private _dateService: DateService) {
		this._cart = [];
		this.cartChange$ = new Subject();
		this.onBranchChange();
	}

	private onBranchChange() {
		this._branchStoreService.onBranchChange().subscribe(() => {
			this.clearCart();
		});
	}

	public onCartChange(): Subject<boolean> {
		return this.cartChange$;
	}

	public addOrUpdate(item: Item, branchItem: BranchItem, orderItemType: 'semester' | 'year'| 'buy') {
		if (this.contains(item.id)) {
			this.updateType(item.id, orderItemType);
		} else {
			this.add(item, branchItem, orderItemType);
		}
	}


	public add(item: Item, branchItem: BranchItem, orderItemType: "semester" | "year" | "buy") {
		const orderItem: OrderItem = {
			item: item.id,
			title: item.title,
			type: null,
			amount: 0,
			unitPrice: 0,
			taxRate: 0,
			taxAmount: 0,
			info: null
		} as OrderItem;



		if (orderItemType === "semester") {
			orderItem.type = "rent";
			orderItem.info = {
				from: new Date(),
				to: new Date(),
				numberOfPeriods: 1,
				periodType: "semester"
			};
		} else if (orderItemType === "year") {
			orderItem.type = "rent";
			orderItem.info = {
				from: new Date(),
				to: new Date(),
				numberOfPeriods: 1,
				periodType: 'year'
			};
		} else if (orderItemType === "buy") {
			orderItem.type = "buy";
		}

		this.setPricesOnOrderItem(orderItem, item);
		this.addToCart(item, branchItem, orderItem, this._branchStoreService.getBranch());
	}

	private setPricesOnOrderItem(orderItem: OrderItem, item: Item) {
		let orderItemType: 'buy' | 'semester' | 'year';

		if (orderItem.type === 'buy') {
			orderItemType = 'buy';
		} else if (orderItem.type === 'rent') {
			orderItemType = orderItem.info.periodType;
		}

		const unitPrice = this._priceService.calculateItemUnitPrice(item, this._branchStoreService.getBranch(), orderItemType);
		const calculatedOrderItemPrices = this._priceService.calculateOrderItemPrices(unitPrice, item.taxRate);

		orderItem.unitPrice = calculatedOrderItemPrices.unitPrice;
		orderItem.taxAmount = calculatedOrderItemPrices.taxAmount;
		orderItem.taxRate = calculatedOrderItemPrices.taxRate;
		orderItem.amount = calculatedOrderItemPrices.amount;
	}

	public addCustomerItemExtend(customerItem: CustomerItem, item: Item, branchItem: BranchItem, branch: Branch) {
		const orderItem: OrderItem = {} as OrderItem;
		orderItem.item = customerItem.item;
		orderItem.title = item.title;
		orderItem.unitPrice = item.price;
		orderItem.amount = this._priceService.calculateCustomerItemUnitPrice(customerItem, item, branch, 'extend');
		orderItem.taxAmount = 0;
		orderItem.taxRate = 0;
		orderItem.type = "extend";
		orderItem.info = {
			from: new Date(),
			to: this._dateService.getExtendDate('semester'),
			numberOfPeriods: 1,
			periodType: "semester",
			customerItem: customerItem.id
		};

		this.addToCart(item, branchItem, orderItem, branch, customerItem);
	}

	public addCustomerItemBuyout(customerItem: CustomerItem, branchItem: BranchItem, item: Item, branch: Branch) {
		const orderItem: OrderItem = {} as OrderItem;
		orderItem.item = customerItem.item;
		orderItem.unitPrice = item.price;
		orderItem.taxAmount = 0;
		orderItem.taxRate = 0;
		orderItem.title = item.title;
		orderItem.amount = this._priceService.calculateCustomerItemUnitPrice(customerItem, item, branch, 'buyout');
		orderItem.type = "buyout";

		this.addToCart(item, branchItem, orderItem, branch, customerItem);
	}

	private addToCart(item: Item, branchItem: BranchItem, orderItem: OrderItem, branch: Branch, customerItem?: CustomerItem) {
		this._cart.push({item: item, branchItem: branchItem, orderItem: orderItem, customerItem: customerItem, branch: branch});
		this.cartChange$.next(true);
	}

	public remove(itemId: string) {
		for (let i = 0; i < this._cart.length; i++) {
			if (this._cart[i].item.id === itemId) {
				this._cart.splice(i, 1);
				this.cartChange$.next(true);
				return;
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

	public getCart(): CartItem[] {
		return this._cart;
	}

	public getSize(): number {
		return this._cart.length;
	}

	public getOrderItems(): OrderItem[] {
		const orderItems: OrderItem[] = [];

		for (const cartItem of this._cart) {
			orderItems.push(cartItem.orderItem);
		}

		return orderItems;
	}

	public clearCart() {
		this._cart = [];
		this.cartChange$.next(true);
	}

	public createOrder(): Order {
		if (this._cart.length <= 0) {
			throw new Error('order can not be created, cart is empty');
		}

		const order: Order = {} as Order;

		order.amount = this.getTotalPrice();
		order.branch = this._branchStoreService.getBranch().id;
		order.customer = this._userService.getUserDetailId();
		order.orderItems = this.getOrderItems();
		order.byCustomer = true;
		order.payments = [];


		return order;
	}

	public get(itemId: string): OrderItem {
		for (let i = 0; i < this._cart.length; i++) {
			if (this._cart[i].item.id === itemId) {
				return this._cart[i].orderItem;
			}
		}
	}

	public updateType(itemId: string, type: OrderItemType | 'semester' | 'year') {
		for (const cartItem of this._cart) {
			if (cartItem.item.id === itemId) {
				switch (type) {
					case "semester":
						this.updateTypeOneSemester(cartItem);
						break;
					case "year":
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

		this.cartChange$.next(true);
	}

	private updateTypeBuyout(cartItem: CartItem) {
		cartItem.orderItem.info = null;
		cartItem.orderItem.type = "buyout";
		this.setPricesOnOrderItem(cartItem.orderItem, cartItem.item);
	}

	private updateTypeExtend(cartItem: CartItem) {
		cartItem.orderItem.info = {
			from: new Date(),
			to: this._dateService.getExtendDate('semester'),
			numberOfPeriods: 1,
			periodType: "semester",
			customerItem: cartItem.customerItem.id
		};
		cartItem.orderItem.type = "extend";
		this.setPricesOnOrderItem(cartItem.orderItem, cartItem.item);
	}

	private updateTypeBuy(cartItem: CartItem) {
		cartItem.orderItem.info = null;
		cartItem.orderItem.type = "buy";
		this.setPricesOnOrderItem(cartItem.orderItem, cartItem.item);
	}

	private updateTypeOneSemester(cartItem: CartItem) {
		cartItem.orderItem.info = {
			from: new Date(),
			to: this._dateService.getPeriodDate('semester'),
			numberOfPeriods: 1,
			periodType: "semester"
		};
		cartItem.orderItem.type = "rent";
		this.setPricesOnOrderItem(cartItem.orderItem, cartItem.item);
	}

	private updateTypeTwoSemesters(cartItem: CartItem) {
		cartItem.orderItem.info = {
			from: new Date(),
			to: this._dateService.getPeriodDate('year'),
			numberOfPeriods: 1,
			periodType: "year"
		};
		cartItem.orderItem.type = "rent";
		this.setPricesOnOrderItem(cartItem.orderItem, cartItem.item);
	}
}
