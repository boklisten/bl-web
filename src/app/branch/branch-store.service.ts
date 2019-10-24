import { Injectable } from "@angular/core";
import {
	BlApiError,
	Branch,
	BranchItem,
	UserDetail
} from "@wizardcoder/bl-model";
import {
	BranchItemService,
	BranchService,
	StorageService,
	TokenService,
	UserDetailService
} from "@wizardcoder/bl-connect";
import { UserService } from "../user/user.service";
import { Subject, Observable } from "rxjs";

@Injectable()
export class BranchStoreService {
	public redirectUrl: string;
	private _currentBranch: Branch;
	private _branchItems: BranchItem[];
	private _branchChange$: Subject<boolean>;
	private _branchStorageName: string;

	constructor(
		private _userService: UserService,
		private _branchService: BranchService,
		private _storageService: StorageService,
		private _branchItemService: BranchItemService
	) {
		this._branchItems = [];
		this._branchChange$ = new Subject<boolean>();
		this._branchStorageName = "bl-current-branch-id";
		this.handleStorageOnBranchChange();
		this.getBranchIdFromStorage();
	}

	private handleStorageOnBranchChange() {
		this.onBranchChange().subscribe(() => {
			try {
				const branchIdString = this._currentBranch.id;
				this._storageService.add(
					this._branchStorageName,
					branchIdString
				);
			} catch (e) {
				console.log("could not store branch id", e);
			}
		});
	}

	private getBranchIdFromStorage() {
		let storedBranchId = "";
		try {
			storedBranchId = this._storageService.get(this._branchStorageName);
		} catch (e) {
			console.log("could not get the stored branch id", e);
		}

		this._branchService
			.getById(storedBranchId)
			.then((branch: Branch) => {
				this.setCurrentBranch(branch);
			})
			.catch(() => {
				console.log("could not get branch");
			});
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
				this._userService
					.getUserDetail()
					.then((userDetail: UserDetail) => {
						if (userDetail.branch) {
							this._branchService
								.getById(userDetail.branch as string)
								.then((branch: Branch) => {
									this.setCurrentBranch(branch);
									resolve(branch);
								})
								.catch((getBranchError: Branch) => {
									reject(getBranchError);
								});
						} else {
							reject(new Error("userDetail.branch is not set"));
						}
					})
					.catch((getUserDetailError: BlApiError) => {
						reject(getUserDetailError);
					});
			} else {
				if (!this._currentBranch) {
					reject(new Error("no branch is set"));
				} else {
					resolve(this._currentBranch);
				}
			}
		});
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

	public getBranchItemsCategories(): Promise<string[]> {
		return new Promise((resolve, reject) => {
			if (this._branchItems && this._branchItems.length > 0) {
				resolve(this.retrieveBranchItemsCategories(this._branchItems));
			} else {
				this.getBranchItems()
					.then(branchItems => {
						resolve(
							this.retrieveBranchItemsCategories(branchItems)
						);
					})
					.catch(err => {
						reject(err);
					});
			}
		});
	}

	private retrieveBranchItemsCategories(branchItems: BranchItem[]): string[] {
		const branchItemCategories: string[] = [];

		for (const branchItem of branchItems) {
			for (const category of branchItem.categories) {
				if (!(branchItemCategories.indexOf(category) > -1)) {
					branchItemCategories.push(category);
				}
			}
		}

		return branchItemCategories.sort();
	}

	public setCurrentBranch(branch: Branch): void {
		if (this._currentBranch === branch) {
			return;
		}

		this._currentBranch = branch;
		//this._userService.updateUserDetail({ branch: branch.id });
		this._branchChange$.next(true);
	}

	public setBranch(branch: Branch): Promise<Branch> {
		return new Promise((resolve, reject) => {
			if (this._currentBranch === branch) {
				resolve(branch);
			}
			this._currentBranch = branch;
			if (this._userService.loggedIn()) {
				this._userService
					.updateUserDetail({ branch: branch.id })
					.then(() => {
						this._branchChange$.next(true);
						resolve(branch);
					})
					.catch(err => {
						reject(err);
					});
			} else {
				this._branchChange$.next(true);
				resolve(branch);
			}
		});
	}

	public fetchBranchItems(): Promise<boolean> {
		return this._branchItemService
			.getManyByIds(this._currentBranch.branchItems as string[])
			.then((branchItems: BranchItem[]) => {
				this._branchItems = branchItems;
				return true;
			})
			.catch(getBranchItemsError => {
				throw new Error(
					"BranchStoreService: could not get branchItems"
				);
			});
	}

	public getBranchItems(): Promise<BranchItem[]> {
		return this._branchItemService
			.getManyByIds(this._currentBranch.branchItems as string[])
			.then((branchItems: BranchItem[]) => {
				this._branchItems = branchItems;
				return branchItems;
			})
			.catch(getBranchItemsError => {
				throw new Error(
					"BranchStoreService: could not get branchItems"
				);
			});
	}
}
