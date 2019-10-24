import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot
} from "@angular/router";
import { BranchStoreService } from "../branch-store.service";
import { UserService } from "../../user/user.service";

@Injectable()
export class BranchGuardService implements CanActivate {
	constructor(
		private _branchStoreService: BranchStoreService,
		private _router: Router
	) {}

	public canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Promise<boolean> {
		if (this._branchStoreService.getBranch()) {
			return Promise.resolve(true);
		}

		return this._branchStoreService
			.getActiveBranch()
			.then(() => {
				return this._branchStoreService
					.fetchBranchItems()
					.then(() => {
						return true;
					})
					.catch(() => {
						return this.onFailure(state);
					});
			})
			.catch(getBranchError => {
				return this.onFailure(state);
			});
	}

	private onFailure(state: RouterStateSnapshot): boolean {
		this._router.navigate(["/b/select"]);
		this._branchStoreService.redirectUrl = state.url;
		return false;
	}
}
