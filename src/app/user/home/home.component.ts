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
		this._router.navigateByUrl('u/edit');
	}

	onYourItemsClick() {
		this._router.navigateByUrl('u/items');
	}

	onBranchClick() {
		this._router.navigate(['/b/info']);
	}

	onLogout() {
		this._userService.logout().then(() => {
			this._router.navigateByUrl('/welcome');
		});
	}



}
