import {Injectable} from '@angular/core';
import {BlApiError, Branch, BranchItem, UserDetail} from "@wizardcoder/bl-model";
import {BranchItemService, BranchService, TokenService, UserDetailService} from "@wizardcoder/bl-connect";
import {UserService} from "../user/user.service";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class BranchStoreService {
	public redirectUrl: string;
	private _currentBranch: Branch;
	private _branchItems: BranchItem[];
	private _branchChange$: Subject<boolean>;

	constructor(private _userService: UserService, private _branchService: BranchService, private _userdetailService: UserDetailService,
				private _branchItemService: BranchItemService) {
		this._branchItems = [];
		this._branchChange$ = new Subject<boolean>();
	}


	public getBranch(): Branch {
		return this._currentBranch;
	}

	public onBranchChange(): Observable<boolean> {
		return this._branchChange$;
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

	public getBranchItems(): BranchItem[] {
		return this._branchItems;
	}

	public getBranchItem(itemId: string): BranchItem {
		for (const branchItem of this._branchItems) {
			if (branchItem.item === itemId) {
				return branchItem;
			}
		}
	}

	public haveBranchItem(itemId: string): boolean {
		for (const branchItem of this._branchItems) {
			if (branchItem.item === itemId) {
				return true;
			}
		}
		return false;
	}

	public setCurrentBranch(branch: Branch): void {
		this._currentBranch = branch;
		this._branchChange$.next(true);
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

	public fetchBranchItems(): Promise<boolean> {
		return this._branchItemService.getManyByIds(this._currentBranch.branchItems).then((branchItems: BranchItem[]) => {
			this._branchItems = branchItems;
			return true;
		}).catch((getBranchItemsError) => {
			throw new Error('BranchStoreService: could not get branchItems');
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
