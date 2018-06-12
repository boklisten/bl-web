import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BranchStoreService} from "../../branch/branch-store.service";
import {UserService} from "../user.service";
import {BlApiError, Branch, UserDetail} from "@wizardcoder/bl-model";
import {BranchService} from "@wizardcoder/bl-connect";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(private _router: Router,
				private _branchStoreService: BranchStoreService,
				private _userService: UserService,
				private _branchService: BranchService) {
	}

	ngOnInit() {
	}

	onOrderClick() {
		this._router.navigateByUrl('u/order');
	}

	onEditDetailClick() {
		this._router.navigateByUrl('auth/register/detail');
	}

	onYourItemsClick() {
		this._router.navigateByUrl('u/items');
	}

	onBranchClick() {
		if (!this._branchStoreService.getBranch()) {
			this._userService.getUserDetail().then((userDetail: UserDetail) => {
				if (userDetail.branch) {
					this._branchService.getById(userDetail.branch).then((branch: Branch) => {
						this._branchStoreService.setCurrentBranch(branch);
						this._router.navigateByUrl('b/info/' + this._branchStoreService.getBranch().id);
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
			this._router.navigateByUrl('b/info/' + this._branchStoreService.getBranch().id);
		}
	}

	onLogout() {
		this._userService.logout().then(() => {
			this._router.navigateByUrl('welcome');
		});
	}



}
