import { Injectable } from "@angular/core";
import { Order, OrderItemType, UserDetail } from "@boklisten/bl-model";
import { Observable, Subject } from "rxjs";
import { CartService } from "../cart.service";
import {
	BranchService,
	OrderService,
	SignatureService,
} from "@boklisten/bl-connect";
import { AuthLoginService } from "@boklisten/bl-login";
import { UserService } from "../../user/user.service";

@Injectable()
export class CartOrderService {
	private _currentOrder: Order; // the order from api
	private _orderChange$: Subject<Order>;
	private _orderClear$: Subject<boolean>;
	private _orderError$: Subject<string>;
	private _userDetail?: UserDetail;

	constructor(
		private _cartService: CartService,
		private _orderService: OrderService,
		private _authLoginService: AuthLoginService,
		private _branchService: BranchService,
		private _signatureService: SignatureService,
		private _userService: UserService
	) {
		this._orderChange$ = new Subject();
		this._orderClear$ = new Subject();
		this._orderError$ = new Subject<string>();
		this.onLogin();
	}

	public onStartCheckout(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (this._cartService.getSize() <= 0) {
				reject(new Error("could not start checkout: cart is empty"));
			}

			this.createOrder()
				.then((createdOrder: Order) => {
					this._currentOrder = createdOrder;
					resolve(true);
				})
				.catch((createOrderError) => {
					reject(
						new Error(
							"could not start checkout: failed to add order" +
								createOrderError
						)
					);
				});
		});
	}

	public onLogin() {
		this._authLoginService.onLogin().subscribe(() => {
			this.clearOrder();
		});

		this._authLoginService.onLogout().subscribe(() => {
			this.clearOrder();
			this._userDetail = null;
		});
	}

	public doesOrderIncludeRent() {
		return this.doesOrderIncludeType("rent");
	}

	public doesOrderIncludePartlyPayment() {
		return this.doesOrderIncludeType("partly-payment");
	}

	public doesOrderIncludeExtend() {
		return this.doesOrderIncludeType("extend");
	}

	public doesOrderIncludeBuy() {
		return this.doesOrderIncludeType("buy");
	}

	public doesOrderIncludeBuyout() {
		return this.doesOrderIncludeType("buyout");
	}

	public doesOrderIncludeType(orderItemType: OrderItemType) {
		if (!this._currentOrder) {
			return false;
		}

		for (const orderItem of this._currentOrder.orderItems) {
			if (orderItem.type === orderItemType) {
				return true;
			}
		}
		return false;
	}

	public patchDelivery(deliveryId: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this._orderService
				.update(this._currentOrder.id, { delivery: deliveryId })
				.then((updatedOrder) => {
					this._currentOrder = updatedOrder;
					resolve(true);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	public setOrder(order: Order) {
		this._currentOrder = order;
		this._orderChange$.next(this._currentOrder);
	}

	public getOrder(): Order {
		return this._currentOrder;
	}

	public clearOrder() {
		this._currentOrder = null;
		this._orderClear$.next(true);
	}

	public onClearOrder(): Observable<boolean> {
		return this._orderClear$;
	}

	public onOrderChange(): Observable<Order> {
		return this._orderChange$;
	}

	private async createOrder(): Promise<Order> {
		this._orderClear$.next(true);
		const order = await this._cartService.createOrder();
		return await this._orderService.add(order);
	}
}
