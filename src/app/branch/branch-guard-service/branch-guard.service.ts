import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {BranchStoreService} from "../branch-store.service";
import {UserService} from "../../user/user.service";

@Injectable()
export class BranchGuardService implements CanActivate {

	constructor(private _branchStoreService: BranchStoreService, private _router: Router, private _userService: UserService) {
	}

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
		if (this._branchStoreService.getBranch()) {
			return Promise.resolve(true);
		}

		return this._branchStoreService.getActiveBranch().then(() => {
			return true;
		}).catch((getBranchError) => {
			this._router.navigate(['/b/select']);
			this._branchStoreService.redirectUrl = state.url;
			return false;
		});
	}

}
