import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BlApiError, Branch} from "@wizardcoder/bl-model";
import {BranchStoreService} from "../branch-store.service";
import {BranchService} from "@wizardcoder/bl-connect";
import {Router} from "@angular/router";

@Component({
	selector: 'app-branch-select',
	templateUrl: './branch-select.component.html',
	styleUrls: ['./branch-select.component.scss']
})
export class BranchSelectComponent implements OnInit {
	@Output() branchSelect: EventEmitter<Branch>;

	public branches: Branch[];
	public selectedBranch: Branch;
	public branchSelectDefaultText: string;

	constructor(private _branchService: BranchService, private _branchStoreService: BranchStoreService, private _router: Router) {
		this.branchSelect = new EventEmitter<Branch>();
		this.branchSelectDefaultText = 'Select a school';
	}

	ngOnInit() {
		this.selectedBranch = this._branchStoreService.getBranch();

		this._branchService.get().then((branches: Branch[]) => {
			this.branches = branches;
		}).catch((blApiError: BlApiError) => {
			console.log('could not get branches');
		});
	}

	onBranchSelect(branch: Branch) {
		this._branchStoreService.setCurrentBranch(branch);
		this.selectedBranch = branch;

		if (this._branchStoreService.redirectUrl) {
			this._router.navigateByUrl(this._branchStoreService.redirectUrl);
			this._branchStoreService.redirectUrl = null;
		}
	}



}
