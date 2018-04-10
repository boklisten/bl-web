import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BlApiError, Branch} from "@wizardcoder/bl-model";
import {BranchStoreService} from "../branch-store.service";
import {BranchService} from "@wizardcoder/bl-connect";

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
	
	constructor(private _branchService: BranchService, private _branchStoreService: BranchStoreService) {
		this.branchSelect = new EventEmitter<Branch>();
		this.branchSelectDefaultText = 'Select a school';
	}
	
	ngOnInit() {
		this._branchService.get().then((branches: Branch[]) => {
			this.branches = branches;
		}).catch((blApiError: BlApiError) => {
			console.log('could not get branches');
		});
	}
	
	onBranchSelectUpdate(branch: Branch) {
		this._branchStoreService.setCurrentBranch(branch);
		
		this._branchStoreService.setUserdetailBranch(branch).then(() => {
		}).catch(() => {
		this.branchSelect.emit(branch);
			console.log('branchSelectComponent: could not update user details');
		});
	}
	
	
	
}
