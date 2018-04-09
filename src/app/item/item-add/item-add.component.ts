import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../../cart/cart.service";
import {Item} from "@wizardcoder/bl-model";

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
		this._cartService.add(this.item, this.type);
	}
	
	onDelete() {
		this._cartService.remove(this.item.id);
	}
	
	isAdded(): boolean {
		return this._cartService.contains(this.item.id);
	}
}
