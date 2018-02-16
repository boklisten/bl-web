import {Component, Input, OnInit} from '@angular/core';
import {Item} from "bl-model";

@Component({
	selector: 'app-item-display',
	templateUrl: './item-display.component.html',
	styleUrls: ['./item-display.component.scss']
})
export class ItemDisplayComponent implements OnInit {
	
	@Input() item: Item;
	
	constructor() {
	}
	
	ngOnInit() {
	}
	
}
