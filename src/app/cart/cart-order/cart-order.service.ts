import {Injectable} from '@angular/core';
import {Order, BlApiError} from '@wizardcoder/bl-model';
import {Subject, Observable} from "rxjs";
import {CartService} from "../cart.service";
import {OrderService} from '@wizardcoder/bl-connect';
import {UserService} from "../../user/user.service";
import {AuthLoginService} from "@wizardcoder/bl-login";
import {OrderItemType} from "@wizardcoder/bl-model/dist/order/order-item/order-item-type";

@Injectable()
export class CartOrderService {

	private _currentOrder: Order; // the order from api
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

		this.onLogin();
  }

  public onStartCheckout(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this._cartService.getSize() <= 0) {
        reject(new Error("could not start checkout: cart is empty"));
      }

      this.createOrder().then((createdOrder: Order) => {
        this._currentOrder = createdOrder;
        resolve(true);
      }).catch((createOrderError) => {
        reject(new Error("could not start checkout: failed to add order" + createOrderError));
      });
    })
  }

	public onLogin() {
    this._authLoginService.onLogin().subscribe(() => {
      this.clearOrder();
    });

    this._authLoginService.onLogout().subscribe(() => {
      this.clearOrder();
    });
  }

  public doesOrderIncludeRent() {
    return this.doesOrderIncludeType('rent');
  }

  public doesOrderIncludeExtend() {
    return this.doesOrderIncludeType('extend');
  }

  public doesOrderIncludeBuy() {
    return this.doesOrderIncludeType('buy');
  }

  public doesOrderIncludeBuyout() {
    return this.doesOrderIncludeType('buyout');
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
      this._orderService.update(this._currentOrder.id, {delivery: deliveryId}).then((updatedOrder) => {
        this._currentOrder = updatedOrder;
        resolve(true);
      }).catch((err) => {
        reject(err);
      })
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

  private createOrder(): Promise<Order> {
		const order = this._cartService.createOrder();
		return this._orderService.add(order);
  }
}
