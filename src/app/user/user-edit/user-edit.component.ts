import {Component, OnInit} from '@angular/core';
import {BlApiError, UserDetail} from "@wizardcoder/bl-model";
import {UserService} from "../user.service";

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
	userDetail: UserDetail;

	constructor(private _userService: UserService) {
	}

	ngOnInit() {
		this._userService.getUserDetail().then((userDetail: UserDetail) => {
			this.userDetail = userDetail;
		}).catch((getUserDetailError: BlApiError) => {
			console.log('UserEditComponent: could not get UserDetail', getUserDetailError);
		});
	}

	onUserDetailSave(patchedValues: any) {
		console.log('clicked saved, patched values', patchedValues);
	}

}
