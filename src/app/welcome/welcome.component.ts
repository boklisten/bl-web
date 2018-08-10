import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user/user.service";

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

	constructor(private _router: Router, private _route: ActivatedRoute, private _userService: UserService) {
	}

	ngOnInit() {
	}

	onLoginClick() {
		this._router.navigate(['/auth/login'], {relativeTo: this._route});
	}

	onRegisterClick() {
		this._router.navigateByUrl('/auth/register');
	}

	isLoggedIn() {
		return this._userService.loggedIn();
	}

	onGoToItemsClick() {
		this._router.navigate(['/i/select']);
	}

	onGoToYourItemsClick() {
		this._router.navigate(['/u/items']);
	}

}
