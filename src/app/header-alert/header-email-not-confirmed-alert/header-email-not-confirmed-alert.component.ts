import { Component, OnInit } from "@angular/core";
import { UserService } from "../../user/user.service";
import { UserDetail } from "@boklisten/bl-model";
import { BlNextLinkerService } from "../../bl-next-linker/bl-next-linker.service";

@Component({
	selector: "app-header-email-not-confirmed-alert",
	templateUrl: "./header-email-not-confirmed-alert.component.html",
	styleUrls: ["./header-email-not-confirmed-alert.component.scss"],
})
export class HeaderEmailNotConfirmedAlertComponent implements OnInit {
	showAlert: boolean;

	constructor(
		private _userService: UserService,
		private _blNextLinkerService: BlNextLinkerService
	) {
		this.showAlert = false;
	}

	ngOnInit() {
		if (this._blNextLinkerService.isLoggedIn()) {
			this.checkIfEmailIsValidated();
		}

		this._blNextLinkerService.onLogin().subscribe(() => {
			this.checkIfEmailIsValidated();
		});

		this._blNextLinkerService.onLogout().subscribe(() => {
			this.showAlert = false;
		});

		this._userService.onUserDetailChange().subscribe(() => {
			this.checkIfEmailIsValidated();
		});
	}

	private checkIfEmailIsValidated() {
		this._userService
			.getUserDetail()
			.then((userDetail: UserDetail) => {
				this.showAlert = !userDetail.emailConfirmed;
			})
			.catch((getUserDetailError) => {
				console.log(
					"HeaderEmailNotConfirmedAlert: could not get userDetail",
					getUserDetailError
				);
			});
	}
}
