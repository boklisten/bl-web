import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BranchStoreService} from "../../branch/branch-store.service";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	
	constructor(private _router: Router, private _branchStoreService: BranchStoreService) {
	}
	
	ngOnInit() {
	}
	
	onOrderClick() {
		this._router.navigateByUrl('u/order');
	}
	
	onItemClick() {
		this._router.navigateByUrl('i/select');
	}
	
	onEditDetailClick() {
		this._router.navigateByUrl('auth/register/detail');
	}
	
	onBranchClick() {
		this._router.navigateByUrl('b/' + this._branchStoreService.getCurrentBranch().id);
	}
	
	
	
}
