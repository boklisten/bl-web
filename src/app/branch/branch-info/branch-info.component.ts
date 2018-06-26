import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {BranchService} from "@wizardcoder/bl-connect";
import {BlApiError, BlApiNotFoundError, Branch} from "@wizardcoder/bl-model";
import {BranchStoreService} from "../branch-store.service";

@Component({
	selector: 'app-branch-info',
	templateUrl: './branch-info.component.html',
	styleUrls: ['./branch-info.component.scss']
})
export class BranchInfoComponent implements OnInit {

	public branch: Branch;
	public warning: boolean;
	public branches: Branch[];
	public selectedBranch: Branch;
	public showBranchMenu: boolean;

	constructor(private _branchService: BranchService, private _branchStoreService: BranchStoreService) {
		this.branches = [];
	}

	ngOnInit() {


		this.selectedBranch = this._branchStoreService.getBranch();


		this._branchService.get().then((branches: Branch[]) => {
			this.branches = branches;

			if (!this.selectedBranch) {
				this.selectedBranch = this.branches[0];
			}
		}).catch((getBranchesError) => {
			console.log('BranchInfoComponent: could not get brances', getBranchesError);
		});
	}

	public onShowBranchMenu() {
		this.showBranchMenu = !this.showBranchMenu;
	}

	public onBranchSelect(branch: Branch) {
		this.selectedBranch = branch;
		this.showBranchMenu = false;
	}
}
