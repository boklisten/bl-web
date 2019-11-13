import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { StorageService } from "@wizardcoder/bl-connect";

@Injectable()
export class UserEditService {
	private _redirectUrl: string;

	constructor(
		private router: Router,
		private userService: UserService,
		private storageService: StorageService
	) {}

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
		let redirect: string;
		try {
			redirect = this.storageService.get("bl-redirect");
		} catch (e) {}

		return redirect ? redirect : this._redirectUrl;
	}

	set redirectUrl(value: string) {
		this._redirectUrl = value;
	}
}
