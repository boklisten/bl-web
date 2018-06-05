import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
	selector: 'app-header-menu-item',
	templateUrl: './header-menu-item.component.html',
	styleUrls: ['./header-menu-item.component.scss']
})
export class HeaderMenuItemComponent implements OnInit {
	@Input() title: string;
	@Input() link: string;

	constructor() {
	}

	ngOnInit() {
	}

}
