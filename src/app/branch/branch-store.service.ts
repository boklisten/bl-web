import {Injectable} from '@angular/core';
import {BlApiError, Branch, UserDetail} from "bl-model";
import {BranchService, TokenService} from "bl-connect";
import {UserService} from "../user/user.service";

@Injectable()
export class BranchStoreService {
	private _currentBranch: Branch;
	
	constructor(private _userService: UserService, private _branchService: BranchService) {
		// setting the branch on app creation
		this.fetchUserBranch().then((branch: Branch) => {
		
		}).catch((blApiError: BlApiError) => {
			console.log('branchStoreService: could not get branch', blApiError);
		});
	}
	
	
	public getBranch(): Branch {
		return this._currentBranch;
	}
	
	private fetchUserBranch(): Promise<Branch> {
		return this._userService.getUserDetail().then((userDetail: UserDetail) => {
			if (userDetail.id) {
				return this._branchService.getById(userDetail.id).then((branch: Branch) => {
					this.setCurrentBranch(branch);
					return branch;
				}).catch((blApiErr: BlApiError) => {
					return Promise.reject(blApiErr);
				});
			} else {
				return this.fetchFirstBranch();
			}
		}).catch(() => {
			return this.fetchFirstBranch();
		});
	}
	
	private fetchFirstBranch(): Promise<Branch> {
		return new Promise((resolve, reject) => {
			this._branchService.get().then((branches: Branch[]) => {
				this.setCurrentBranch(branches[0]);
				resolve(branches[0]);
			}).catch((blApiErr: BlApiError) => {
				reject(blApiErr);
			});
		});
	}

	public setCurrentBranch(branch: Branch): void {
		console.log('sat the current branch to: ', branch);
		this._currentBranch = branch;
	}
	
	
	
}
