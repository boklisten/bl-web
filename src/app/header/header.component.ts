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
	
	
	public onLogoClick() {
		this._router.navigateByUrl('/welcome');
	}
	
	public onUserClick() {
		this._router.navigateByUrl('/u/home');
	}
	
	public onItemSelectClick() {
		this._router.navigateByUrl('/i/select');
	}
	
	
	
}
