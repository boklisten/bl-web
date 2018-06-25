import {Component, OnInit} from '@angular/core';
import {Branch, Item} from "@wizardcoder/bl-model";
import {Router} from "@angular/router";
import {BranchStoreService} from "../../branch/branch-store.service";

@Component({
	selector: 'app-item-select',
	templateUrl: './item-select.component.html',
	styleUrls: ['./item-select.component.scss']
})
export class ItemSelectComponent implements OnInit {
	public items: Item[];
	public branch: Branch;

	constructor(private _router: Router, private _branchStoreService: BranchStoreService) {

	}

	ngOnInit() {
		this.branch = this._branchStoreService.getBranch();
	}
}
