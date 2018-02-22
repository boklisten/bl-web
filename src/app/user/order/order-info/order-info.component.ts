import {Component, Input, OnInit} from '@angular/core';
import {Order} from "bl-model";
import {Router} from "@angular/router";

@Component({
	selector: 'app-order-info',
	templateUrl: './order-info.component.html',
	styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {
	@Input() order: Order;
	
	constructor(private _router: Router) {
	}
	
	ngOnInit() {
	}
	
	onWhereToGetClick() {
		this._router.navigateByUrl('/b/info/' + this.order.branch);
	}
	
}
