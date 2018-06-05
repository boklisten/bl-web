import {Pipe, PipeTransform} from '@angular/core';
import {BranchService} from "@wizardcoder/bl-connect";
import {Branch} from "@wizardcoder/bl-model";
import {AsyncPipe} from "@angular/common";

@Pipe({
	name: 'blcBranch'
})
export class BlcBranchPipe implements PipeTransform {

	constructor(private _branchService: BranchService) {

	}

	transform(branchId: any, args?: any): Promise<string> {
		if (!branchId) {
			return Promise.reject('');
		}
		return this._branchService.getById(branchId).then((branch: Branch) => {
			return branch.name;
		}).catch((getBranchError) => {
			throw new Error('BlcBranchPipe: could not get branch: ' + getBranchError);
		});
	}

}
