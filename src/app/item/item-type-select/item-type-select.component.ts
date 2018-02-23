import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "bl-model";
import {DateService} from "../../date/date.service";
import {CartService} from "../../cart/cart.service";
import {PriceService} from "../../price/price.service";

@Component({
	selector: 'app-item-type-select',
	templateUrl: './item-type-select.component.html',
	styleUrls: ['./item-type-select.component.scss']
})
export class ItemTypeSelectComponent implements OnInit {
	
	@Input() item: Item;
	@Output() type: EventEmitter<string>;
	
	public typeSelect: "one" | "two" | "buy";
	
	constructor(private _dateService: DateService, private _cartService: CartService, private _priceService: PriceService) {
		this.type = new EventEmitter<string>();
		this.typeSelect = 'one';
	}
	
	
	ngOnInit() {
		
		this.updateBasedOnCart();
	}
	
	showDate(): boolean {
		return (this.typeSelect !== "buy");
	}
	
	public onTypeUpdate(type: "one" | "two" | "buy") {
		if (this._cartService.contains(this.item.id)) {
			this._cartService.updateType(this.item.id, type);
		}
		this.type.emit(type);
	}
	
	public getDate(): string {
		if (this.typeSelect === "buy") {
			return '';
		}
		return this._dateService.getDate(this.typeSelect);
	}
	
	updateBasedOnCart() {
		if (this._cartService.contains(this.item.id)) {
			const orderItem = this._cartService.get(this.item.id);
			if (orderItem.rentInfo) {
				if (orderItem.rentInfo.oneSemester) {
					this.typeSelect = "one";
				} else if (orderItem.rentInfo.twoSemesters) {
					this.typeSelect = "two";
				}
			} else {
				this.typeSelect = "buy";
			}
			
		}
		this.onTypeUpdate(this.typeSelect);
	}
	
	public showPrice(): boolean {
		return this._priceService.showPrice();
	}
	
}
