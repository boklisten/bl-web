import {Injectable} from '@angular/core';
import {TokenService, UserDetailService} from "bl-connect";
import {BlApiError, BlError, UserDetail, UserPermission} from "bl-model";

@Injectable()
export class UserService {
	
	constructor(private _tokenService: TokenService, private _userDetailService: UserDetailService) {
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
	
}
