import {Injectable} from '@angular/core';
import {Order, BlApiError} from '@wizardcoder/bl-model';
import {Subject, Observable} from "rxjs";
import {CartService} from "../cart.service";
import {OrderService} from '@wizardcoder/bl-connect';
import {UserService} from "../../user/user.service";
import {AuthLoginService} from "@wizardcoder/bl-login";

@Injectable()
export class CartOrderService {

	private _currentOrder: Order;
	private _orderChange$: Subject<Order>;
	private _orderClear$: Subject<boolean>;
	private _orderError$: Subject<string>;

	constructor(private _cartService: CartService, private _orderService: OrderService, private _authLoginService: AuthLoginService) {
		this._orderChange$ = new Subject();
		this._orderClear$ = new Subject();
		this._orderError$ = new Subject<string>();


		if (this._cartService.getSize() > 0) {
			this.createOrder();
		}

		this.onCartChange();
		this.onLogin();
	}

	public onLogin() {
		this._authLoginService.onLogin().subscribe(() => {
			this.reloadOrder();
		});

		this._authLoginService.onLogout().subscribe(() => {
			this.clearOrder();
		});
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

	public onClearOrder(): Observable<boolean> {
		return this._orderClear$;
	}

	public onOrderChange(): Observable<Order> {
		return this._orderChange$;
	}

	private onCartChange() {
		this._cartService.onCartChange().subscribe(() => {
			if (this._cartService.getSize() > 0) {
				this.createOrder();
			}
		});
	}

	private createOrder() {
		const order = this._cartService.createOrder();

		this._orderService.add(order).then((addedOrder: Order) => {
			this.setOrder(addedOrder);
		}).catch((blApiErr: BlApiError) => {
			this._orderError$.next('cartOrderService: could not add order: ' + blApiErr);
		});
	}
}
