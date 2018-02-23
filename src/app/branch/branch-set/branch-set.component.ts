import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BranchStoreService} from "../branch-store.service";

@Component({
	selector: 'app-branch-set',
	templateUrl: './branch-set.component.html',
	styleUrls: ['./branch-set.component.scss']
})
export class BranchSetComponent implements OnInit {
	
	constructor(private _router: Router, private _branchStoreService: BranchStoreService) {
	}
	
	ngOnInit() {
	}
	
	onBranchSelect() {
		this._router.navigateByUrl('/i/select');
	}
}
