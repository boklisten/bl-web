import {Injectable} from "@angular/core";
import {UserService} from "../../user.service";
import {OrderService} from "@wizardcoder/bl-connect";
import {BlApiError, Order, UserDetail} from "@wizardcoder/bl-model";


@Injectable()
export class UserOrderService {

	constructor(private userService: UserService, private orderService: OrderService) {

	}

	public alreadyHaveOrderedItem(itemId: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.userService.getUserDetail().then((userDetail: UserDetail) => {
				this.getOrders(userDetail).then((orders: Order[]) => {
					resolve(this.checkIfItemIsAlreadyOrdered(itemId, orders));
				}).catch(() => {
					reject(('UserOrderService: could not fetch orders'));
				});
			}).catch((getUserDetailError) => {
				reject('UserOrderService: could not get user details: ' + getUserDetailError);
			});
		});
	}

	private checkIfItemIsAlreadyOrdered(itemId: string, orders: Order[]) {
		for (const order of orders) {
			for (const orderItem of order.orderItems) {
				if (orderItem.item === itemId) {
					if (!orderItem.delivered && !orderItem.info.customerItem && !orderItem.movedToOrder) {
						if (orderItem.type !== 'buyout' && orderItem.type !== 'extend' && orderItem.type !== 'cancel') {
							return true;
						}
					}
				}
			}
		}
		return false;
	}

	private getOrders(userDetail: UserDetail): Promise<Order[]> {
		return new Promise((resolve, reject) => {
			if (this.userService.haveOrders()) {
				this.orderService.getManyByIds(userDetail.orders).then((orders: Order[]) => {
					resolve(orders);
				}).catch((getOrdersError: BlApiError) => {
					reject('UserOrderService: could not get orders: ' + getOrdersError);
				});
			} else {
				return resolve([]);
			}
		});

	}
}
