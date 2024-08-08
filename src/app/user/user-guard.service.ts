import { Injectable } from "@angular/core";
import {
	CanActivate,
	Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
} from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
export class UserGuardService implements CanActivate {
	constructor(private _userService: UserService, private _router: Router) {}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		if (!this._userService.loggedIn()) {
			this._router.navigate(["/auth/menu"], {
				queryParams: { redirect: state.url, caller: "bl-web" },
				replaceUrl: true,
			});
			return false;
		}

		return true;
	}
}
