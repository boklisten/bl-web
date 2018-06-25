import {Injectable} from '@angular/core';
import {CustomerItemService, TokenService, UserDetailService} from "@wizardcoder/bl-connect";
import {BlApiError, BlError, CustomerItem, UserDetail, UserPermission} from "@wizardcoder/bl-model";
import {Subject} from "rxjs";

@Injectable()
export class UserService {

	private _customerItems: CustomerItem[];
	private _userDetail: UserDetail;
	private _onLogin$: Subject<boolean>;

	constructor(private _tokenService: TokenService,
				private _userDetailService: UserDetailService,
				private _customerItemService: CustomerItemService) {

		this._customerItems = [];
	}

	public logout(): Promise<boolean> {
		this._tokenService.removeTokens();
		return Promise.resolve(true);
	}

	public isUserDetailValid(): Promise<boolean> {
		return Promise.resolve(true);
	}

	public getUserBranchId(): string {
		if (this._userDetail) {
			return this._userDetail.branch;
		}
	}

	public getUserName(): string {
		if (!this._tokenService.haveAccessToken()) {
			return '';
		}
		return this._tokenService.getAccessTokenBody().username;
	}

	public getUserId(): string {
		if (!this._tokenService.haveAccessToken()) {
			return '';
		}
		return this._tokenService.getAccessTokenBody().sub;
	}

	public getPermission(): UserPermission {
		if (!this._tokenService.haveAccessToken()) {
			return;
		}
		return this._tokenService.getAccessTokenBody().permission;
	}

	public getUserDetail(): Promise<UserDetail> {
		return new Promise((resolve, reject) => {
			if (!this.loggedIn()) {
				return reject(new BlError('can not get user detail since user is not logged in'));
			}

			this._userDetailService.getById(this.getUserDetailId()).then((userDetail: UserDetail) => {
				resolve(userDetail);
				this._userDetail = userDetail;
			}).catch((blApiErr: BlApiError) => {
				reject(blApiErr);
			});
		});
	}

	public getUserDetailId(): string {
		if (!this._tokenService.haveAccessToken()) {
			return '';
		}
		return this._tokenService.getAccessTokenBody().details;
	}

	public loggedIn(): boolean {
		return (this._tokenService.haveAccessToken());
	}

	public isCustomerItemActive(itemId: string): Promise<boolean> {
		if (!this.loggedIn()) {
			return Promise.reject(new BlError('user is not logged in'));
		}
		return new Promise((resolve, reject) => {
			this.getCustomerItems().then((customerItems: CustomerItem[]) => {
				for (const customerItem of customerItems) {
					if (customerItem.item === itemId) {
						resolve((customerItem.active && !customerItem.returned));
					}
				}
				reject(false);
			}).catch(() => {
				console.log('userService: could not get customeritems');
			});
		});
	}

	public getCustomerItems(): Promise<CustomerItem[]> {
		return new Promise((resolve, reject) => {
			if (this._customerItems.length <= 0) {
				if (!this._userDetail) {
					this.getUserDetail().then((userDetail: UserDetail) => {
						this.fetchCustomerItems(userDetail.customerItems).then((customerItems: CustomerItem[]) => {
							this._customerItems = customerItems;
							resolve(customerItems);
						}).catch((blApiErr: BlApiError) => {
							reject(blApiErr);
						});
					}).catch((blApiErr: BlApiError) => {
						reject(blApiErr);
					});
				} else {
					this.fetchCustomerItems(this._userDetail.customerItems).then((customerItems: CustomerItem[]) => {
						this._customerItems = customerItems;
						resolve(customerItems);
					}).catch((blApiErr: BlApiError) => {
						reject(blApiErr);
					});
				}
			} else {
				resolve(this._customerItems);
			}
		});
	}

	private fetchCustomerItems(customerItemIds: string[]): Promise<CustomerItem[]> {
		return new Promise((resolve, reject) => {
			this._customerItemService.getManyByIds(customerItemIds).then((customerItems: CustomerItem[]) => {
				resolve(customerItems);
			}).catch((blApiErr: BlApiError) => {
				reject(blApiErr);
			});
		});
	}

}
