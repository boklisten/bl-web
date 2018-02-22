import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ItemService} from "bl-connect";
import {BlApiError, Item} from "bl-model";
import {CartService} from "../../cart/cart.service";

@Component({
	selector: 'app-item-info',
	templateUrl: './item-info.component.html',
	styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {
	public item: Item;
	
	constructor(private _route: ActivatedRoute, private _itemService: ItemService, private _cartService: CartService) {
	}
	
	ngOnInit() {
		const id = this._route.snapshot.paramMap.get('id');
		
		this._itemService.getById(id).then((item: Item) => {
			this.item = item;
			
		}).catch((blApiErr: BlApiError) => {
			console.log('the error', blApiErr);
		});
	}
	
	isAdded(): boolean {
		return this._cartService.contains(this.item.id);
	}
	
	onAdd() {
		this._cartService.add(this.item);
	}
	
	onDelete() {
		this._cartService.remove(this.item.id);
	}
	
}
