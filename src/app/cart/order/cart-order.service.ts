import {Injectable} from '@angular/core';
import {Order, BlApiError} from '@wizardcoder/bl-model';
import {Subject} from "rxjs/Subject";
import {CartService} from "../cart.service";
import {OrderService} from '@wizardcoder/bl-connect';
import {UserService} from "../../user/user.service";

@Injectable()
export class CartOrderService {

	private _currentOrder: Order;
	private _orderChange$: Subject<Order>;
	private _orderClear$: Subject<boolean>;

	constructor(private _cartService: CartService, private _orderService: OrderService, private _userService: UserService) {
		this._orderChange$ = new Subject();
		this._orderClear$ = new Subject();


		if (this._cartService.getSize() > 0) {
			this.createOrder();
		}

		this.onCartChange();
	}

	public setOrder(order: Order) {
		this._currentOrder = order;
		this._orderChange$.next(this._currentOrder);
	}

	public reloadOrder() {
		this.createOrder();
	}

	public getOrder(): Order {
		return this._currentOrder;
	}

	public clearOrder() {
		this._currentOrder = null;
		this._orderClear$.next(true);
	}

	public onClearOrder(): Subject<boolean> {
		return this._orderClear$;
	}

	public onOrderChange(): Subject<Order> {
		return this._orderChange$;
	}

	public updateOrderWithNoPayments() {
		this._orderService.update(this._currentOrder.id, {payments: []}).then((updatedOrder: Order) => {
			this.setOrder(updatedOrder);
		}).catch((blApiErr: BlApiError) => {
			console.log('cartOrderService: could not patch order: ', blApiErr);
		});
	}

	private onCartChange() {
		this._cartService.onCartChange().subscribe(() => {
			if (this._cartService.getSize() > 0) {
				this.createOrder();
			}
		});
	}

	private onLogin() {
	}

	private onLogout() {
	}

	private createOrder() {
		const order = this._cartService.createOrder();

		console.log('the order to add', order);

		this._orderService.add(order).then((addedOrder: Order) => {
			this.setOrder(addedOrder);
		}).catch((blApiErr: BlApiError) => {
			console.log('cartOrderService: could not add order', blApiErr);
		});
	}
}
