import { Injectable } from "@angular/core";
import {
	CustomerItemService,
	TokenService,
	UserDetailService,
} from "@boklisten/bl-connect";
import {
	BlApiError,
	BlError,
	CustomerItem,
	UserDetail,
	UserPermission,
} from "@boklisten/bl-model";
import { Subject } from "rxjs";
import { AuthLoginService } from "@boklisten/bl-login";
import { Observable } from "rxjs/internal/Observable";
import { UserOrderService } from "./order/user-order/user-order.service";
import { GoogleAnalyticsService } from "../GoogleAnalytics/google-analytics.service";

@Injectable()
export class UserService {
	private _customerItems: CustomerItem[];
	private _userDetail: UserDetail;
	private userDetail$: Subject<UserDetail>;
	private _onLogin$: Subject<boolean>;

	constructor(
		private _tokenService: TokenService,
		private _userDetailService: UserDetailService,
		private _customerItemService: CustomerItemService,
		private _authService: AuthLoginService,
		private _googleAnalyticsService: GoogleAnalyticsService
	) {
		this._customerItems = [];
		this.userDetail$ = new Subject<UserDetail>();

		this._authService.onLogin().subscribe(() => {
			this.fetchUserDetail();
			this._googleAnalyticsService.eventEmitter(
				"login",
				"User logged in"
			);
		});

		this._authService.onLogout().subscribe(() => {
			this._userDetail = null;
			this._googleAnalyticsService.eventEmitter(
				"logout",
				"User logged out"
			);
		});

		if (this._authService.isLoggedIn()) {
			this.fetchUserDetail();
		}
	}

	public updateUserDetail(data: any): Promise<boolean> {
		if (!this.loggedIn()) {
			return Promise.reject(
				new Error("could not update userDetail, user not logged in")
			);
		}

		return new Promise((resolve, reject) => {
			this._userDetailService
				.update(this._userDetail.id, data)
				.then((updatedUserDetail: UserDetail) => {
					this.setUserDetail(updatedUserDetail);
					resolve(true);
				})
				.catch((updateUserDetailError: BlApiError) => {
					console.log(
						"userService: could not update userDetail",
						updateUserDetailError
					);
					reject(new Error("could not update userDetail"));
				});
		});
	}

	public setUserDetail(userDetail: UserDetail) {
		this._userDetail = userDetail;
		this.userDetail$.next(this._userDetail);
	}

	public reloadUserDetail() {
		this._userDetailService
			.getById(this._userDetail.id)
			.then((reloadedUserDetail: UserDetail) => {
				this.setUserDetail(reloadedUserDetail);
			})
			.catch((getUserDetailError: BlApiError) => {
				//console.log('userService: could not get userDetail', getUserDetailError);
			});
	}

	public onUserDetailChange(): Observable<UserDetail> {
		return this.userDetail$.asObservable();
	}

	public logout(): Promise<boolean> {
		this._authService.logout("/welcome");
		return Promise.resolve(true);
	}

	public haveOrders(): boolean {
		return (
			this._userDetail &&
			this._userDetail.orders &&
			this._userDetail.orders.length > 0
		);
	}

	public isUserDetailValid(): Promise<boolean> {
		if (this.loggedIn() && this._userDetail) {
			return this._userDetailService
				.isValid(this.getUserDetailId())
				.then(
					(isUserDetailValidObj: {
						valid: boolean;
						invalidFields?: string[];
					}) => {
						return isUserDetailValidObj.valid;
					}
				)
				.catch((err: BlApiError) => {
					throw err;
				});
		} else {
			return Promise.resolve(true);
		}
	}

	private fetchUserDetail() {
		this.getUserDetail()
			.then((userDetail: UserDetail) => {
				this.setUserDetail(userDetail);
			})
			.catch((getUserDetailError: BlApiError) => {
				console.log(
					"userService: could not get userDetail",
					getUserDetailError
				);
			});
	}

	public getUserDetail(): Promise<UserDetail> {
		if (this._userDetail) {
			return Promise.resolve(this._userDetail);
		}

		return new Promise((resolve, reject) => {
			if (!this.loggedIn()) {
				return reject(
					new BlError(
						"can not get user detail since user is not logged in"
					)
				);
			}

			this._userDetailService
				.getById(this.getUserDetailId())
				.then((userDetail: UserDetail) => {
					resolve(userDetail);
					this._userDetail = userDetail;
				})
				.catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
		});
	}

	public getUserDetailId(): string {
		if (!this._tokenService.haveAccessToken()) {
			return "";
		}
		return this._tokenService.getAccessTokenBody().details;
	}

	public loggedIn(): boolean {
		return this._tokenService.haveAccessToken();
	}

	public isCustomerItemActive(itemId: string): Promise<boolean> {
		if (!this.loggedIn()) {
			return Promise.reject(new BlError("user is not logged in"));
		}

		return new Promise((resolve, reject) => {
			this.getCustomerItems()
				.then((customerItems: CustomerItem[]) => {
					for (const customerItem of customerItems) {
						if (customerItem.item === itemId) {
							resolve(
								customerItem.active && !customerItem.returned
							);
						}
					}
					reject(false);
				})
				.catch(() => {
					console.log("userService: could not get customeritems");
				});
		});
	}

	public getCustomerItems(): Promise<CustomerItem[]> {
		return new Promise((resolve, reject) => {
			if (this._customerItems.length <= 0) {
				if (!this._userDetail) {
					this.getUserDetail()
						.then((userDetail: UserDetail) => {
							this.fetchCustomerItems(
								userDetail.customerItems as string[]
							)
								.then((customerItems: CustomerItem[]) => {
									this._customerItems = customerItems;
									resolve(customerItems);
								})
								.catch((blApiErr: BlApiError) => {
									reject(blApiErr);
								});
						})
						.catch((blApiErr: BlApiError) => {
							reject(blApiErr);
						});
				} else {
					this.fetchCustomerItems(
						this._userDetail.customerItems as string[]
					)
						.then((customerItems: CustomerItem[]) => {
							this._customerItems = customerItems;
							resolve(customerItems);
						})
						.catch((blApiErr: BlApiError) => {
							reject(blApiErr);
						});
				}
			} else {
				resolve(this._customerItems);
			}
		});
	}

	private fetchCustomerItems(
		customerItemIds: string[]
	): Promise<CustomerItem[]> {
		return new Promise((resolve, reject) => {
			this._customerItemService
				.getManyByIds(customerItemIds)
				.then((customerItems: CustomerItem[]) => {
					resolve(customerItems);
				})
				.catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
		});
	}
}
