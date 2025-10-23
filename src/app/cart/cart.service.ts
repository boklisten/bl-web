import { Injectable } from "@angular/core";
import {
	Branch,
	BranchItem,
	CustomerItem,
	Item,
	Order,
	OrderItem,
	Period,
	UserDetail,
} from "@boklisten/bl-model";
import { BranchStoreService } from "../branch/branch-store.service";
import { UserService } from "../user/user.service";
import { PriceService } from "../price/price.service";
import { Subject } from "rxjs";
import { DateService } from "../date/date.service";
import { OrderItemType } from "@boklisten/bl-model";
import { Observable } from "rxjs/internal/Observable";
import {
	BranchService,
	SignatureService,
	StorageService,
} from "@boklisten/bl-connect";
import { GoogleAnalyticsService } from "../GoogleAnalytics/google-analytics.service";
import { UserCustomerItemService } from "../user/user-customer-item/user-customer-item.service";
import { BlNextLinkerService } from "../bl-next-linker/bl-next-linker.service";

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
	private _cartStorageName: string;
	private _branch: Branch;

	constructor(
		private _branchStoreService: BranchStoreService,
		private _userService: UserService,
		private _priceService: PriceService,
		private _dateService: DateService,
		private _blNextLinkerService: BlNextLinkerService,
		private _storageService: StorageService,
		private _googleAnalyticsService: GoogleAnalyticsService,
		private _userCustomerItemService: UserCustomerItemService,
		private _branchService: BranchService,
		private _signatureService: SignatureService
	) {
		this._cart = [];

		this._cartStorageName = "bl-shopping-cart";
		this.cartChange$ = new Subject();
		this._branch = this._branchStoreService.getBranch();

		this.getCartFromStorage();
		this.onBranchChange();
		this.onLogout();
		this.handleStorageOnCartChange();
	}

	public hasPartlyPaymentItems(): boolean {
		return this.getCart().some(
			(cartItem) => cartItem.orderItem.type === "partly-payment"
		);
	}

	public shouldPay(): boolean {
		for (const cartItem of this._cart) {
			if (
				cartItem.orderItem.type === "buyout" ||
				cartItem.orderItem.type === "extend" ||
				cartItem.orderItem.type === "buy"
			) {
				return true;
			}
		}

		return false;
	}

	public isOnlyCustomerItems(): boolean {
		for (const cartItem of this.getCart()) {
			if (!cartItem.customerItem) {
				return false;
			}
		}
		return true;
	}

	private getCartFromStorage() {
		try {
			const storedCartString = this._storageService.get(
				this._cartStorageName
			);
			this._cart = JSON.parse(storedCartString) as CartItem[];
		} catch (e) {
			console.log("could not get cart from storage");
		}
	}

	private handleStorageOnCartChange() {
		this.onCartChange().subscribe(() => {
			try {
				const cartString = JSON.stringify(this._cart);
				this._storageService.add(this._cartStorageName, cartString);
			} catch (e) {
				console.log("could not add cart to storage", e);
			}
		});
	}

	private onLogout() {
		this._blNextLinkerService.onLogout().subscribe(() => {
			this.clearCart();
		});
	}

	private onBranchChange() {
		this._branchStoreService.onBranchChange().subscribe(() => {
			if (!this._branch) {
				// dont clear cart on first branch change
				this._branch = this._branchStoreService.getBranch();
			} else {
				this.clearCart();
			}
		});
	}

	public onCartChange(): Observable<boolean> {
		return this.cartChange$.asObservable();
	}

	public addOrUpdate(
		item: Item,
		branchItem: BranchItem,
		orderItemType: OrderItemType,
		period?: Period
	) {
		if (this.contains(item.id)) {
			this.updateType(item.id, orderItemType, period);
		} else {
			this.add(item, branchItem, orderItemType, period);
		}
	}

	public add(
		item: Item,
		branchItem: BranchItem,
		orderItemType: OrderItemType,
		period?: Period
	) {
		const orderItem: OrderItem = {
			item: item.id,
			title: item.title,
			type: orderItemType,
			amount: 0,
			unitPrice: 0,
			taxRate: 0,
			taxAmount: 0,
			info: null,
		} as OrderItem;

		if (orderItemType === "rent") {
			orderItem.info = {
				from: new Date(),
				to: this._dateService.getPeriodDate(period),
				numberOfPeriods: 1,
				periodType: period,
			};
		} else if (orderItemType === "partly-payment") {
			orderItem.info = {
				from: new Date(),
				to: this._dateService.getPartlyPaymentPeriodDate(period),
				amountLeftToPay: this._priceService.calculatePartlyPaymentAmountLeftToPay(
					item.price,
					period
				),
				periodType: period,
			};
		}

		this.setPricesOnOrderItem(orderItem, item, period);

		if (this._userCustomerItemService.isExtendableCustomerItem(item.id)) {
			const customerItem = this._userCustomerItemService.getCustomerItemByItemId(
				item.id
			);
			orderItem.info = {
				from: new Date(),
				to: this._dateService.getExtendDate("semester"),
				numberOfPeriods: 1,
				periodType: "semester",
				customerItem: customerItem.id,
			};
			orderItem.type = "extend";
			this.addToCart(
				item,
				branchItem,
				orderItem,
				this._branchStoreService.getBranch(),
				customerItem
			);
			return;
		}

		this.addToCart(
			item,
			branchItem,
			orderItem,
			this._branchStoreService.getBranch()
		);
	}

	private setPricesOnOrderItem(
		orderItem: OrderItem,
		item: Item,
		period?: Period
	) {
		const unitPrice = this._priceService.calculateItemUnitPrice(
			item,
			this._branchStoreService.getBranch(),
			orderItem.type,
			period
		);

		const calculatedOrderItemPrices = this._priceService.calculateOrderItemPrices(
			unitPrice
		);

		orderItem.unitPrice = calculatedOrderItemPrices.unitPrice;
		orderItem.amount = calculatedOrderItemPrices.amount;
	}

	private setPricesOnOrderItemByCustomerItem(
		customerItem: CustomerItem,
		item: Item,
		branch: Branch,
		orderItem: OrderItem
	) {
		const unitPrice = this._priceService.calculateCustomerItemUnitPrice(
			customerItem,
			item,
			branch,
			orderItem.type
		);
		const calculatedOrderItemPrices = this._priceService.calculateOrderItemPrices(
			unitPrice
		);

		orderItem.unitPrice = calculatedOrderItemPrices.unitPrice;
		orderItem.amount = calculatedOrderItemPrices.amount;
	}

	public addCustomerItemExtend(
		customerItem: CustomerItem,
		item: Item,
		branchItem: BranchItem,
		branch: Branch
	) {
		const orderItem: OrderItem = {} as OrderItem;
		orderItem.type = "extend";

		this.setPricesOnOrderItemByCustomerItem(
			customerItem,
			item,
			branch,
			orderItem
		);

		orderItem.item = customerItem.item;
		orderItem.title = item.title;
		orderItem.info = {
			from: new Date(),
			to: this._dateService.getExtendDate("semester"),
			numberOfPeriods: 1,
			periodType: "semester",
			customerItem: customerItem.id,
		};

		this.addToCart(item, branchItem, orderItem, branch, customerItem);
	}

	public addCustomerItemBuyout(
		customerItem: CustomerItem,
		branchItem: BranchItem,
		item: Item,
		branch: Branch
	) {
		const orderItem: OrderItem = {} as OrderItem;
		orderItem.type = "buyout";

		this.setPricesOnOrderItemByCustomerItem(
			customerItem,
			item,
			branch,
			orderItem
		);
		orderItem.item = customerItem.item;
		orderItem.title = item.title;
		orderItem.customerItem = customerItem.id;

		this.addToCart(item, branchItem, orderItem, branch, customerItem);
	}

	private addToCart(
		item: Item,
		branchItem: BranchItem,
		orderItem: OrderItem,
		branch: Branch,
		customerItem?: CustomerItem
	) {
		this._cart.push({
			item: item,
			branchItem: branchItem,
			orderItem: orderItem,
			customerItem: customerItem,
			branch: branch,
		});
		this.cartChange$.next(true);
		this._googleAnalyticsService.eventEmitter(
			"add_to_cart",
			"Add item to cart"
		);
	}

	public remove(itemId: string) {
		for (let i = 0; i < this._cart.length; i++) {
			if (this._cart[i].item.id === itemId) {
				this._cart.splice(i, 1);
				this.cartChange$.next(true);
				this._googleAnalyticsService.eventEmitter(
					"remove_from_cart",
					"Remove item from cart"
				);
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

	public async createOrder(): Promise<Order> {
		if (this._cart.length <= 0) {
			throw new Error("order can not be created, cart is empty");
		}

		const order: Order = {} as Order;
		const branch = this._branchStoreService.getBranch();

		order.amount = this.getTotalPrice();
		order.branch = branch ? branch.id : null;
		order.customer = this._userService.getUserDetailId();
		order.orderItems = this.getOrderItems();
		order.byCustomer = true;
		order.payments = [];
		order.pendingSignature = await this.isSignatureRequired(
			await this._userService.getUserDetail(),
			order
		);

		return order;
	}

	public get(itemId: string): OrderItem {
		for (let i = 0; i < this._cart.length; i++) {
			if (this._cart[i].item.id === itemId) {
				return this._cart[i].orderItem;
			}
		}
	}

	public isCustomerItem(itemId: string): boolean {
		for (let i = 0; i < this._cart.length; i++) {
			if (this._cart[i].item.id === itemId) {
				if (this._cart[i].customerItem) {
					return true;
				}
			}
		}
		return false;
	}

	public async isSignatureRequired(userDetail: UserDetail, order: Order) {
		const orderItemTypesWhichRequireSignature: OrderItemType[] = [
			"buy",
			"rent",
			"loan",
		];

		return (
			order.orderItems.some((orderItem) =>
				orderItemTypesWhichRequireSignature.includes(orderItem.type)
			) &&
			!(await this._signatureService.hasValidSignature(
				userDetail,
				new Date()
			))
		);
	}

	public updateType(itemId: string, type: OrderItemType, period?: Period) {
		for (const cartItem of this._cart) {
			if (cartItem.item.id === itemId) {
				cartItem.orderItem.type = type;
				switch (type) {
					case "rent":
						this.updateTypeRent(cartItem, period);
						break;
					case "partly-payment":
						this.updateTypePartlyPayment(cartItem, period);
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

		this.setPricesOnOrderItemByCustomerItem(
			cartItem.customerItem,
			cartItem.item,
			cartItem.branch,
			cartItem.orderItem
		);
	}

	private updateTypeExtend(cartItem: CartItem) {
		cartItem.orderItem.info = {
			from: new Date(),
			to: this._dateService.getExtendDate("semester"),
			numberOfPeriods: 1,
			periodType: "semester",
			customerItem: cartItem.customerItem.id,
		};
		this.setPricesOnOrderItemByCustomerItem(
			cartItem.customerItem,
			cartItem.item,
			cartItem.branch,
			cartItem.orderItem
		);
	}

	private updateTypeBuy(cartItem: CartItem) {
		cartItem.orderItem.info = null;
		this.setPricesOnOrderItem(cartItem.orderItem, cartItem.item);
	}

	private updateTypeRent(cartItem: CartItem, period: Period) {
		cartItem.orderItem.info = {
			from: new Date(),
			to: this._dateService.getPeriodDate(period),
			numberOfPeriods: 1,
			periodType: period,
		};
	}

	private updateTypePartlyPayment(cartItem: CartItem, period: Period) {
		cartItem.orderItem.info = {
			from: new Date(),
			to: this._dateService.getPartlyPaymentPeriodDate(period),
			numberOfPeriods: 1,
			periodType: period,
			amountLeftToPay: this._priceService.calculatePartlyPaymentAmountLeftToPay(
				cartItem.item.price,
				period
			),
		};
	}
}
