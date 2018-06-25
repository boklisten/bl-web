import {Component, OnInit} from '@angular/core';
import {BlApiError, UserDetail} from "@wizardcoder/bl-model";
import {UserService} from "../user.service";
import {UserDetailService} from "@wizardcoder/bl-connect";

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
	userDetail: UserDetail;

	constructor(private _userService: UserService, private _userDetailService: UserDetailService) {
	}

	ngOnInit() {
		this._userService.getUserDetail().then((userDetail: UserDetail) => {
			this.userDetail = userDetail;
			this.userDetail.dob = new Date();
		}).catch((getUserDetailError: BlApiError) => {
			console.log('UserEditComponent: could not get UserDetail', getUserDetailError);
		});
	}

	onUserDetailSave(patchedValues: any) {
		this._userDetailService.update(this.userDetail.id, patchedValues).then((updatedUserDetail: UserDetail) => {
			this.userDetail = updatedUserDetail;
		}).catch((updateUserDetailError: BlApiError) => {
			console.log('UserEditComponent: could not update userDetail', updateUserDetailError);
		});
	}

}
