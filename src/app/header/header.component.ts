import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	
	constructor(private _router: Router, private _route: ActivatedRoute) {
	}
	
	ngOnInit() {
	}
	
	onLoginClick() {
		this._router.navigate(['/auth/login'], {relativeTo: this._route});
	}
	
	onRegisterClick() {
		this._router.navigate(['/auth/register'], {relativeTo: this._route});
	}
	
}
