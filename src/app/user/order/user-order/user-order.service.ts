import {Injectable} from "@angular/core";
import {UserService} from "../../user.service";
import {OrderService} from "@wizardcoder/bl-connect";
import {BlApiError, Order, UserDetail} from "@wizardcoder/bl-model";


@Injectable()
export class UserOrderService {
	private orders: Order[];
	private userDetail: UserDetail;

	constructor(private userService: UserService, private orderService: OrderService) {

		this.userService.onUserDetailChange().subscribe((userDetail: UserDetail) => {
			this.userDetail = userDetail;
			this.fetchOrders();
		});
	}

	public alreadyHaveOrderedItem(itemId: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (!this.userDetail) {
				this.userService.getUserDetail().then((userDetail: UserDetail) => {
					this.userDetail = userDetail;
					this.fetchOrders().then(() => {
						resolve(this.checkIfItemIsAlreadyOrdered(itemId));
					}).catch(() => {
						reject(('UserOrderService: could not fetch orders'));
					});
				}).catch((getUserDetailError) => {
					reject('UserOrderService: could not get user details: ' + getUserDetailError);
				});
			} else {
				this.fetchOrders().then(() => {
					resolve(this.checkIfItemIsAlreadyOrdered(itemId));
				}).catch(() => {
					reject(('UserOrderService: could not fetch orders'));
				});
			}
		});
	}

	private checkIfItemIsAlreadyOrdered(itemId: string) {
		if (!this.orders) {
			return false;
		}

		for (const order of this.orders) {
			for (const orderItem of order.orderItems) {
				if (orderItem.item === itemId) {
					if (!orderItem.delivered) {
						return true;
					}
				}
			}
		}
		return false;
	}



	private fetchOrders() {
		return new Promise((resolve, reject) => {
			if (this.userService.haveOrders()) {
				this.orderService.getManyByIds(this.userDetail.orders).then((orders: Order[]) => {
					this.orders = orders;
					resolve(true);
				}).catch((getOrdersError: BlApiError) => {
					reject('UserOrderService: could not get orders: ' + getOrdersError);
				});
			} else {
				return resolve(true);
			}
		});

	}
}
