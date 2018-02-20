import {Injectable} from '@angular/core';
import {TokenService} from "bl-connect";
import {UserPermission} from "bl-model";

@Injectable()
export class UserService {
	
	constructor(private _tokenService: TokenService) {
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
	
}
