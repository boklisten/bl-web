import {Component, Input, OnInit} from '@angular/core';
import {Item} from "bl-model";
import {CartService} from "../../cart/cart.service";

@Component({
	selector: 'app-item-display',
	templateUrl: './item-display.component.html',
	styleUrls: ['./item-display.component.scss']
})
export class ItemDisplayComponent implements OnInit {
	
	@Input() item: Item;
	
	constructor(private _cartService: CartService) {
	}
	
	ngOnInit() {
	
	}
	
	onAdd() {
		this._cartService.add(this.item);
	}
	
	onDelete() {
		this._cartService.remove(this.item);
	}
	
	isAdded(): boolean {
		return this._cartService.contains(this.item);
	}
	
}
