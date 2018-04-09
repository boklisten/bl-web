import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {BranchService} from "@wizardcoder/bl-connect";
import {BlApiError, BlApiNotFoundError, Branch} from "@wizardcoder/bl-model";

@Component({
	selector: 'app-branch-info',
	templateUrl: './branch-info.component.html',
	styleUrls: ['./branch-info.component.scss']
})
export class BranchInfoComponent implements OnInit {
	
	public branch: Branch;
	public warningText: string;
	
	constructor(private _branchService: BranchService, private _router: Router, private _route: ActivatedRoute) {
	}
	
	ngOnInit() {
		this.warningText = null;
		const id = this._route.snapshot.paramMap.get('id');
		
		this.getBranch(id);
	
	}
	
	public onBranchSelect(branch: Branch) {
		if (branch.id === this.branch.id) {
			return;
		}
		
		this._router.navigateByUrl('/b/info/' + branch.id);
		
		this.getBranch(branch.id);
	}
	
	private getBranch(id: string) {
		this._branchService.getById(id).then((branch: Branch) => {
			this.branch = branch;
		}).catch((blApiError: BlApiError) => {
			if (blApiError instanceof BlApiNotFoundError) {
				this.warningText = 'branch not found';
				return;
			}
			this.warningText = 'could not get the branch';
		});
	}
}
