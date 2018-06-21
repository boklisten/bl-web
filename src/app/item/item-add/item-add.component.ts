import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../../cart/cart.service";
import {BranchItem, Item} from "@wizardcoder/bl-model";

@Component({
	selector: 'app-item-add',
	templateUrl: './item-add.component.html',
	styleUrls: ['./item-add.component.scss']
})
export class ItemAddComponent implements OnInit {

	@Input() item: Item;
	@Input() type: "semester" | "year" | "buy";
	@Input() branchItem: BranchItem;

	constructor(private _cartService: CartService) {
	}

	ngOnInit() {
	}

	onAdd() {
		if (this.item && this.branchItem && this.type) {
			this._cartService.add(this.item, this.branchItem, this.type);
		}
	}

	onDelete() {
		if (this.item && this.branchItem && this.type) {
			this._cartService.remove(this.item.id);
		}
	}

	isAdded(): boolean {
		if (!this.item) {
			return false;
		}
		return this._cartService.contains(this.item.id);
	}
}
