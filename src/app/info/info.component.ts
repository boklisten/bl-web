import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
	public showInfoMenu: boolean;
	public selectedMenuButton: string;

	constructor() {
		this.selectedMenuButton = 'faq';
	}

	ngOnInit() {
	}

	onShowInfoMenu() {
		this.showInfoMenu = !this.showInfoMenu;
	}

	onSelectMenuButton(menuButton: string) {
		this.selectedMenuButton = menuButton;
		this.showInfoMenu = false;
	}

}
