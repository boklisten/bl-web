import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../user.service";

@Injectable()
export class UserEditService {
	private _redirectUrl: string;

	constructor(private router: Router, private userService: UserService) {}

	public updateUserDetail(data: any) {
		return new Promise((resolve, reject) => {
			this.userService
				.updateUserDetail(data)
				.then(() => {
					resolve(true);
					if (this.redirectUrl) {
						this.router.navigateByUrl(this.redirectUrl);
						this.redirectUrl = null;
					} else {
						this.router.navigateByUrl("/i/select");
					}
				})
				.catch(() => {
					reject(new Error("could not update userDetail"));
				});
		});
	}

	get redirectUrl(): string {
		return this._redirectUrl;
	}

	set redirectUrl(value: string) {
		this._redirectUrl = value;
	}
}
