import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../user/user.service";

@Component({
	selector: 'app-header-user-detail-alert',
	templateUrl: './header-user-detail-alert.component.html',
	styleUrls: ['./header-user-detail-alert.component.scss']
})
export class HeaderUserDetailAlertComponent implements OnInit {
	showAlert: boolean;

	constructor(private _router: Router, private _userService: UserService) {
		this.showAlert = false;
	}

	ngOnInit() {
		this._userService.isUserDetailValid().then((valid: boolean) => {
			if (valid) {
				this.showAlert = false;
			} else {
				this.showAlert = true;
			}
		}).catch(() => {
		});
	}

	onEditClick() {
		this._router.navigate(['/u/edit']);
	}



}
