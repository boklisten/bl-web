import {Injectable} from '@angular/core';
import {BlApiError, Branch, UserDetail} from "bl-model";
import {BranchService, TokenService} from "bl-connect";
import {UserService} from "../user/user.service";

@Injectable()
export class BranchStoreService {
	private _currentBranch: Branch;
	
	constructor(private _userService: UserService, private _branchService: BranchService) {
	}
	
	public getCurrentBranch(): Branch {
		
		return this._currentBranch;
	}
	
	public setCurrentBranch(branch: Branch): void {
		this._currentBranch = branch;
	}
	
	
	
}
