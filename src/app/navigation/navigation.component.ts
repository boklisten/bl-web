import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
	
	constructor(private _router: Router, private _route: ActivatedRoute, private _location: Location) {
	}
	
	ngOnInit() {
	}
	
	onGoBack() {
		this._location.back();
	}
	
}
