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
	
	onTestUserClick() {
		this._router.navigate(['/u/home'], {relativeTo: this._route});
	}
	
	onTestBranchClick() {
		this._router.navigate(['/b/5a1d67cdf14cbe78ff047d00'], {relativeTo: this._route});
	}
	
	onTestItemClick() {
		this._router.navigate(['/i/select'], {relativeTo: this._route});
	}
	
	onTestOrderClick() {
		this._router.navigate(['/u/order'], {relativeTo: this._route});
	}
}
