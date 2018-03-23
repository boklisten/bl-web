import {Injectable} from '@angular/core';
import {CartService} from "../cart.service";
import {Order, BlApiError, Delivery} from 'bl-model';
import {OrderService} from 'bl-connect';
import {Subject} from "rxjs/Subject";
import {CartDeliveryService} from "../cart-delivery/cart-delivery.service";

@Injectable()
export class CartCheckoutService {
	private _currentOrder: Order;
	private _onOrderChange$: Subject<Order>;
	
	constructor(private _cartService: CartService, private _orderService: OrderService, private _cartDeliveryService: CartDeliveryService) {
		
		this._onOrderChange$ = new Subject();
		
		try {
			const order = this._cartService.createOrder();
			
			this.updateOrAddOrder(order).then((addedOrder: Order) => {
				this._currentOrder = addedOrder;
				this._onOrderChange$.next(this._currentOrder);
			}).catch((blApiErr: BlApiError) => {
				console.log('cartCheckoutService: could not add order', blApiErr);
			});
		} catch (e) {
			console.log('cartCheckoutService: could not create order', e);
		}
		
		this.onCartChange();
		this.onDeliveryChange();
	}
	
	private onCartChange() {
		this._cartService.onCartChange().subscribe(() => {
			this.updateOrAddOrder(this._cartService.createOrder()).then((updatedOrder: Order) => {
				this._currentOrder = updatedOrder;
				this._onOrderChange$.next(this._currentOrder);
			}).catch((blApiErr: BlApiError) => {
				console.log('cartCheckoutService: could not update order', blApiErr);
			});
		});
	}
	
	private onDeliveryChange() {
		this._cartDeliveryService.onDeliveryChange().subscribe((delivery: Delivery) => {
			console.log('the delivery changed', delivery);
		});
	}
	
	public onOrderChange(): Subject<Order> {
		return this._onOrderChange$;
	}
	
	public getOrder(): Order {
		return this._currentOrder;
	}
	
	private updateOrAddOrder(order: Order): Promise<Order> {
		if (!this._currentOrder) {
			return this._orderService.add(order).then((addedOrder: Order) => {
				return addedOrder;
			}).catch((blApiErr) => {
				return Promise.reject(blApiErr);
			});
		}
		
		return this._orderService.update(this._currentOrder.id, order).then((updatedOrder: Order) => {
			return updatedOrder;
		}).catch((blApiErr: BlApiError) => {
			return Promise.reject(blApiErr);
		});
	}
}
