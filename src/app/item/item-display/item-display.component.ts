import {Component, Input, OnInit} from '@angular/core';
import {Item} from "bl-model";
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
	
	public type: "one" | "two" | "buy";
	
	constructor(private _router: Router, private _priceService: PriceService) {
	}
	
	ngOnInit() {
	
	}
	
	public onItemClick() {
		this._router.navigateByUrl('i/' + this.item.id);
	}
	
	public onItemTypeChange(type: "one" | "two" | "buy") {
		this.type = type;
	}
	
	public getPrice(): number {
		if (this.type === "one") {
			return this._priceService.oneSemester(this.item);
		} else if (this.type === "two") {
			return this._priceService.twoSemesters(this.item);
		} else {
			return this.item.price;
		}
		
	}
	
	public priceOneSemester(): number {
		return this._priceService.oneSemester(this.item);
	}
	
	public priceTwoSemesters(): number {
		return this._priceService.twoSemesters(this.item);
	}
	
}
