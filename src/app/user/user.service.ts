import {Injectable} from '@angular/core';
import {CustomerItemService, TokenService, UserDetailService} from "bl-connect";
import {BlApiError, BlError, CustomerItem, UserDetail, UserPermission} from "bl-model";

@Injectable()
export class UserService {
	
	private _customerItems: CustomerItem[];
	private _userDetail: UserDetail;
	
	constructor(private _tokenService: TokenService, private _userDetailService: UserDetailService,
				private _customerItemService: CustomerItemService) {
		
		this._customerItems = [];
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
			if (!this._tokenService.haveAccessToken()) {
				reject(new BlError('can not get user detail since user is not logged in'));
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
	
	public isCustomerItemActive(itemId: string): Promise<boolean> {
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
