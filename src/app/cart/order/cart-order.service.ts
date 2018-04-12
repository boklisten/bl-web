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
	
	private onCartChange() {
		this._cartService.onCartChange().subscribe(() => {
			if (this._cartService.getSize() > 0) {
				if (this._currentOrder) {
					this.updateOrder(this._cartService.createOrder());
				} else {
					this.createOrder();
				}
			}
		});
	}
	
	private onLogin() {
	}
	
	private onLogout() {
	}
	
	public setOrder(order: Order) {
		this._currentOrder = order;
		this._orderChange$.next(this._currentOrder);
	}
	
	private createOrder() {
		const order = this._cartService.createOrder();
		
		this._orderService.add(order).then((addedOrder: Order) => {
			this.setOrder(addedOrder);
		}).catch((blApiErr: BlApiError) => {
			console.log('cartOrderService: could not add order', blApiErr);
		});
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
	
	/**
	 * used by other classes to tell the cartOrderService that the order has changed on remote api
	 */
	public refetchOrder() {
		if (!this._currentOrder) {
			return;
		}
		
		this._orderService.getById(this._currentOrder.id).then((refetchedOrder: Order) => {
			if (this._currentOrder !== refetchedOrder) {
				console.log('the order was refetched from api', refetchedOrder);
				this.setOrder(refetchedOrder);
			}
		}).catch((blApiErr: BlApiError) => {
			console.log('cartOrderService: error when trying to get order', blApiErr);
		});
	}
	
	private updateOrder(order: Order) {
		this._orderService.update(this._currentOrder.id, order).then((updatedOrder: Order) => {
			this.setOrder(updatedOrder);
		}).catch((blApiErr: BlApiError) => {
			console.log('cartOrderService: could not update order: ', blApiErr);
		});
	}
}
