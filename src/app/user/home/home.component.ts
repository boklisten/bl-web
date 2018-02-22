import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BranchStoreService} from "../../branch/branch-store.service";
import {UserService} from "../user.service";
import {BlApiError, Branch, UserDetail} from "bl-model";
import {BranchService} from "bl-connect";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	
	constructor(private _router: Router, private _branchStoreService: BranchStoreService, private _userService: UserService,
				private _branchService: BranchService) {
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
		if (!this._branchStoreService.getCurrentBranch()) {
			this._userService.getUserDetail().then((userDetail: UserDetail) => {
				if (userDetail.branch) {
					this._branchService.getById(userDetail.branch).then((branch: Branch) => {
						this._branchStoreService.setCurrentBranch(branch);
						this._router.navigateByUrl('b/info' + this._branchStoreService.getCurrentBranch().id);
					}).catch((branchApiError: BlApiError) => {
						console.log('userHomeComponent: could not get branch');
					});
				} else {
					this._router.navigateByUrl('b/set');
				}
			}).catch((blApiErr: BlApiError) => {
				console.log('userHomeComponent: could not get userDetail');
			});
		} else {
			this._router.navigateByUrl('b/info/' + this._branchStoreService.getCurrentBranch().id);
		}
	}
	
	
	
}
