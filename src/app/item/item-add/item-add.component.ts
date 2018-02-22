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
	
	constructor(private _cartService: CartService) {
	}
	
	ngOnInit() {
	}
	
	onAdd() {
		this._cartService.add(this.item);
	}
	
	onDelete() {
		this._cartService.remove(this.item.id);
	}
	
	isAdded(): boolean {
		return this._cartService.contains(this.item.id);
	}
}
