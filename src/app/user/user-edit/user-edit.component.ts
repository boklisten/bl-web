import {Component, OnInit} from '@angular/core';
import {BlApiError, UserDetail} from "@wizardcoder/bl-model";
import {UserService} from "../user.service";
import {UserEditService} from "./user-edit.service";

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
	userDetail: UserDetail;

	constructor(private _userService: UserService, private _userEditService: UserEditService) {
	}

	ngOnInit() {

		this._userService.getUserDetail().then((userDetail: UserDetail) => {
			this.userDetail = userDetail;
			this.userDetail.dob = new Date();
		}).catch((getUserDetailError: BlApiError) => {
			console.log('UserEditComponent: could not get UserDetail', getUserDetailError);
		});

		this._userService.onUserDetailChange().subscribe((userDetail: UserDetail) => {
			this.userDetail = userDetail;
		});
	}

	onUserDetailSave(patchedValues: any) {
		this._userEditService.updateUserDetail(patchedValues);
	}

}
