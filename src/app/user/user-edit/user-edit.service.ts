import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {UserService} from "../user.service";


@Injectable()
export class UserEditService {
	private _redirectUrl: string;

	constructor(private router: Router, private userService: UserService) {

	}

	public updateUserDetail(data: any) {
		this.userService.updateUserDetail(data);
		if (this.redirectUrl) {
			this.router.navigateByUrl(this.redirectUrl);
			this.redirectUrl = null;
		}
	}

	get redirectUrl(): string {
		return this._redirectUrl;
	}

	set redirectUrl(value: string) {
		this._redirectUrl = value;
	}
}
