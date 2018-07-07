import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

	constructor(private _router: Router, private _route: ActivatedRoute) {
	}

	ngOnInit() {
	}

	onLoginClick() {
		this._router.navigate(['/auth/login'], {relativeTo: this._route});
	}

	onRegisterClick() {
		this._router.navigateByUrl('/auth/register');
	}

}
