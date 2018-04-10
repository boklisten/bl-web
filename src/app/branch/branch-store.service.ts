import {Injectable} from '@angular/core';
import {BlApiError, Branch, UserDetail} from "@wizardcoder/bl-model";
import {BranchService, TokenService, UserDetailService} from "@wizardcoder/bl-connect";
import {UserService} from "../user/user.service";

@Injectable()
export class BranchStoreService {
	private _currentBranch: Branch;
	
	constructor(private _userService: UserService, private _branchService: BranchService, private _userdetailService: UserDetailService) {
	}
	
	
	public getBranch(): Branch {
		return this._currentBranch;
	}
	
	public getActiveBranch(): Promise<Branch> {
		return new Promise((resolve, reject) => {
			if (this._userService.loggedIn()) {
				this._userService.getUserDetail().then((userDetail: UserDetail) => {
					if (userDetail.branch) {
						this._branchService.getById(userDetail.branch).then((branch: Branch) => {
							this.setCurrentBranch(branch);
							resolve(branch);
						}).catch((getBranchError: Branch) => {
							reject(getBranchError);
						});
					} else {
						reject(new Error('userDetail.branch is not set'));
					}
				}).catch((getUserDetailError: BlApiError) => {
					reject(getUserDetailError);
				});
			} else {
				if (!this._currentBranch) {
					reject(new Error('no branch is set'));
				} else {
					resolve(this._currentBranch);
				}
			}
		});
	}
	
	public setCurrentBranch(branch: Branch): void {
		this._currentBranch = branch;
	}
	
	public setUserdetailBranch(branch: Branch): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this._userService.getUserDetail().then((userDetail: UserDetail) => {
				this._userdetailService.update(userDetail.id, {branch: branch.id}).then((updatedUserdetail: UserDetail) => {
					resolve(true);
				}).catch((userdetailUpdateError: BlApiError) => {
					reject(userdetailUpdateError);
				});
			}).catch((getUserdetailError: BlApiError) => {
				reject(getUserdetailError);
			});
		});
	}
	
	private fetchUserBranch(): Promise<Branch> {
		return this._userService.getUserDetail().then((userDetail: UserDetail) => {
			if (userDetail.branch) {
				return this._branchService.getById(userDetail.branch).then((branch: Branch) => {
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
	
	
}
