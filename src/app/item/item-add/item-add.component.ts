import { Component, Input, OnInit } from "@angular/core";
import { CartService } from "../../cart/cart.service";
import { BranchItem, Item, OrderItemType, Period } from "@wizardcoder/bl-model";

@Component({
	selector: "app-item-add",
	templateUrl: "./item-add.component.html",
	styleUrls: ["./item-add.component.scss"]
})
export class ItemAddComponent implements OnInit {
	@Input() item: Item;
	@Input() type: OrderItemType;
	@Input() branchItem: BranchItem;
	@Input() period: Period;
	@Input() autoAdd: boolean;

	constructor(private _cartService: CartService) {}

	ngOnInit() {
		if (this.autoAdd) {
			this.onAdd();
		}
	}

	onAdd() {
		if (this.item && this.branchItem && this.type) {
			this._cartService.add(
				this.item,
				this.branchItem,
				this.type,
				this.period
			);
		}
	}

	onDelete() {
		if (this.item) {
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
