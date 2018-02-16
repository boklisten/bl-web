import {Injectable} from '@angular/core';
import {Branch} from "bl-model";

@Injectable()
export class BranchStoreService {
	private _currentBranch: Branch;
	
	constructor() {
	}
	
	public getCurrentBranch(): Branch {
		return this._currentBranch;
	}
	
	public setCurrentBranch(branch: Branch): void {
		this._currentBranch = branch;
	}
	
}
