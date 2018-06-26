import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
	selector: 'app-info-menu-list',
	templateUrl: './info-menu-list.component.html',
	styleUrls: ['./info-menu-list.component.scss']
})
export class InfoMenuListComponent implements OnInit {
	@Input() selectedMenuButton: string;
	@Output() selected: EventEmitter<string>;


	constructor() {
		this.selected = new EventEmitter<string>();
	}

	ngOnInit() {
	}

	onSelectMenuButton(type: string) {
		this.selected.emit(type);
	}

}
