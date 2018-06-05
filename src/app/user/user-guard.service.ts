
import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {UserService} from "./user.service";

@Injectable()
export class UserGuardService implements CanActivate {
	constructor(private _userService: UserService, private _router: Router) {
	
	}
	canActivate(): boolean {
		
		if (!this._userService.loggedIn()) {
			this._router.navigate(['/auth/menu']);
			return false;
		}
		
		return true;
	}
}