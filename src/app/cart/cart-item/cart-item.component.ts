import {Component, Input, OnInit} from '@angular/core';
import {Item, OrderItem} from "bl-model";
import {DateService} from "../../date/date.service";
import {PriceService} from "../../price/price.service";

@Component({
	selector: 'app-cart-item',
	templateUrl: './cart-item.component.html',
	styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
	
	@Input() cartItem: {item: Item, orderItem: OrderItem};
	
	public semester: "one" | "two" = "one";
	
	constructor(private _dateService: DateService, private _priceService: PriceService) {
	}
	
	ngOnInit() {
	}
	
	getPrice(): number {
		return this._priceService.calculatePrice(this.cartItem.item, this.semester);
	}
	
	getDate(): string {
		return this._dateService.getDate(this.semester);
	}
}
