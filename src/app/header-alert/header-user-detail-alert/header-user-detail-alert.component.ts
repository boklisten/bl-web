import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
	selector: 'app-header-user-detail-alert',
	templateUrl: './header-user-detail-alert.component.html',
	styleUrls: ['./header-user-detail-alert.component.scss']
})
export class HeaderUserDetailAlertComponent implements OnInit {

	constructor(private _router: Router) {
	}

	ngOnInit() {
	}

	onEditClick() {
		this._router.navigate(['/u/edit']);
	}



}
