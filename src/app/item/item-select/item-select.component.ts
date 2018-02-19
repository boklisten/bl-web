import {Component, OnInit} from '@angular/core';
import {BranchService, ItemService} from "bl-connect";
import {BlApiError, Branch, Item} from "bl-model";

@Component({
	selector: 'app-item-select',
	templateUrl: './item-select.component.html',
	styleUrls: ['./item-select.component.scss']
})
export class ItemSelectComponent implements OnInit {
	public items: Item[];
	public branch: Branch;
	
	constructor(private _itemService: ItemService, private _branchService: BranchService) {
	}
	
	ngOnInit() {
		this.testGetBranch();
	}
	
	private testGetBranch() {
		this._branchService.get().then((branches: Branch[]) => {
			this.onBranchSelect(branches[0]);
		}).catch((blApiError: BlApiError) => {
			console.log('error getting testGetBranch: ', blApiError);
		});
	}
	
	onBranchSelect(branch: Branch) {
		this.branch = branch;
		this._itemService.getManyByIds(branch.items).then((items: Item[]) => {
			this.items = items;
		}).catch((blApiError: BlApiError) => {
			console.log('the error', blApiError);
		});
	}
	
}
