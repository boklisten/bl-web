import {Component, OnInit} from '@angular/core';
import {BranchService} from "bl-connect";
import {BlApiError, Branch} from "bl-model";

@Component({
	selector: 'app-branch-select',
	templateUrl: './branch-select.component.html',
	styleUrls: ['./branch-select.component.scss']
})
export class BranchSelectComponent implements OnInit {
	public branches: Branch[];
	
	public selectedBranch: Branch;
	
	constructor(private _branchService: BranchService) {
	}
	
	ngOnInit() {
		this._branchService.get().then((branches: Branch[]) => {
			this.branches = branches;
		}).catch((blApiError: BlApiError) => {
			console.log('could not get branches');
		});
	}
	
}
