import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../../cart/cart.service";
import {Item} from "bl-model";

@Component({
	selector: 'app-item-add',
	templateUrl: './item-add.component.html',
	styleUrls: ['./item-add.component.scss']
})
export class ItemAddComponent implements OnInit {
	
	@Input() item: Item;
	@Input() type: "one" | "two" | "buy";
	
	constructor(private _cartService: CartService) {
	}
	
	ngOnInit() {
	}
	
	onAdd() {
		this._cartService.add(this.item);
		if (this.type) {
			this._cartService.updateType(this.item.id, this.type);
			console.log('we updated the type, item is now', this._cartService.get(this.item.id));
		}
	}
	
	onDelete() {
		this._cartService.remove(this.item.id);
	}
	
	isAdded(): boolean {
		return this._cartService.contains(this.item.id);
	}
}
