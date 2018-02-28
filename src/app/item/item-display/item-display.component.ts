import {Component, Input, OnInit} from '@angular/core';
import {Branch, CustomerItem, Item} from "bl-model";
import {CartService} from "../../cart/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PriceService} from "../../price/price.service";

@Component({
	selector: 'app-item-display',
	templateUrl: './item-display.component.html',
	styleUrls: ['./item-display.component.scss']
})
export class ItemDisplayComponent implements OnInit {
	
	@Input() item: Item;
	@Input() customerItem: CustomerItem;
	@Input() branch: Branch;
	
	public orderItemType: "one" | "two" | "buy" | "buyout" | "extend";
	
	constructor(private _router: Router, private _priceService: PriceService) {
	}
	
	ngOnInit() {
	
	}
	
	public onItemClick() {
		this._router.navigateByUrl('i/' + this.item.id);
	}
	
	public onItemTypeChange(type: "one" | "two" | "buy" | "buyout" | "extend") {
		this.orderItemType = type;
	}
	
	public isCustomerItem(): boolean {
		return !(!this.customerItem);
	}
	
	public getPrice(): number {
		switch (this.orderItemType) {
			case "one":
				return this._priceService.oneSemester(this.item);
			case "two":
				return this._priceService.twoSemesters(this.item);
			case "buy":
				return this.item.price;
			case "buyout":
				return this._priceService.buyoutPrice(this.customerItem, this.item);
			case "extend":
				return this._priceService.extendPrice(this.customerItem, this.branch);
		}
	}
	
	public showPrice(): boolean {
		return this._priceService.showPrice();
	}
}
