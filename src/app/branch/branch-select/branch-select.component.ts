import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BlApiError, Branch} from "bl-model";
import {BranchStoreService} from "../branch-store.service";
import {BranchService} from "bl-connect";

@Component({
	selector: 'app-branch-select',
	templateUrl: './branch-select.component.html',
	styleUrls: ['./branch-select.component.scss']
})
export class BranchSelectComponent implements OnInit {
	@Output() branchSelect: EventEmitter<Branch>;
	
	public branches: Branch[];
	public selectedBranch: Branch;
	
	constructor(private _branchService: BranchService, private _branchStoreService: BranchStoreService) {
		this.branchSelect = new EventEmitter<Branch>();
	}
	
	ngOnInit() {
		this._branchService.get().then((branches: Branch[]) => {
			this.branches = branches;
		}).catch((blApiError: BlApiError) => {
			console.log('could not get branches');
		});
	}
	
	onBranchSelectUpdate(branch: Branch) {
		this.branchSelect.emit(branch);
		this._branchStoreService.setCurrentBranch(branch);
	}
	
	
	
}
