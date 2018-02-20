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
	
	
	
}
