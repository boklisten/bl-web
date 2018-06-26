import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../user/user.service";
import {AuthLoginService} from "@wizardcoder/bl-login";

@Component({
	selector: 'app-header-user-detail-alert',
	templateUrl: './header-user-detail-alert.component.html',
	styleUrls: ['./header-user-detail-alert.component.scss']
})
export class HeaderUserDetailAlertComponent implements OnInit {
	showAlert: boolean;

	constructor(private _router: Router, private _userService: UserService, private _authService: AuthLoginService) {
		this.showAlert = false;
	}

	ngOnInit() {
		if (this._authService.isLoggedIn()) {
			this.checkIfUserDetailIsValid();
		}

		this._authService.onLogin().subscribe(() => {
			this.checkIfUserDetailIsValid();
		});

		this._authService.onLogout().subscribe(() => {
			this.checkIfUserDetailIsValid();
		});

		this._userService.onUserDetailChange().subscribe(() => {
			this.checkIfUserDetailIsValid();
		});

	}

	private checkIfUserDetailIsValid() {
		if (!this._authService.isLoggedIn()) {
			this.showAlert = false;
			return;
		}

		if (this._userService.haveOrders()) {
			this._userService.isUserDetailValid().then((valid: boolean) => {
				this.showAlert = !valid;
			}).catch((isUserDetailValidError) => {
				console.log('userService: could not check if user detail is not valid', isUserDetailValidError);
			});
		}

	}

	onEditClick() {
		this._router.navigate(['/u/edit']);
	}



}
