import { Component, OnInit } from "@angular/core";
import { BlApiError, UserDetail } from "@boklisten/bl-model";
import { UserService } from "../user.service";
import { UserEditService } from "./user-edit.service";
import * as moment from "moment";

@Component({
	selector: "app-user-edit",
	templateUrl: "./user-edit.component.html",
	styleUrls: ["./user-edit.component.scss"],
})
export class UserEditComponent implements OnInit {
	userDetail: UserDetail;
	testDob: any;
	saved: boolean;
	loading: boolean;

	constructor(
		private _userService: UserService,
		private _userEditService: UserEditService
	) {}

	ngOnInit() {
		this.saved = false;
		this._userService
			.getUserDetail()
			.then((userDetail: UserDetail) => {
				this.userDetail = userDetail;
			})
			.catch((getUserDetailError: BlApiError) => {
				console.log(
					"UserEditComponent: could not get UserDetail",
					getUserDetailError
				);
			});

		this._userService
			.onUserDetailChange()
			.subscribe((userDetail: UserDetail) => {
				this.userDetail = userDetail;

				if (this.loading) {
					this.saved = true;
					this.loading = false;
					setTimeout(() => {
						this.saved = false;
					}, 1500);
				}
			});
	}

	onUserDetailSave(patchedValues: any) {
		this.loading = true;
		window.scroll(0, 0);
		this._userEditService
			.updateUserDetail(patchedValues)
			.then(() => {})
			.catch(() => {});
	}
}
