import {Component, Input, OnInit} from '@angular/core';
import {Order} from "@wizardcoder/bl-model";

@Component({
	selector: 'app-order-info',
	templateUrl: './order-info.component.html',
	styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {
	@Input() order: Order;

	constructor() {
	}

	ngOnInit() {
	}


}
