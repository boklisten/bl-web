import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlApiError, Item, OrderItem} from "bl-model";
import {DateService} from "../../date/date.service";
import {PriceService} from "../../price/price.service";
import {BranchStoreService} from "../../branch/branch-store.service";
import {Router} from "@angular/router";
import {ItemService} from "bl-connect";

@Component({
	selector: 'app-cart-item',
	templateUrl: './cart-item.component.html',
	styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
	
	@Input() orderItem: OrderItem;
	@Output() remove: EventEmitter<string>;
	
	public semester: "one" | "two" = "one";
	public item: Item;
	private _type: "one" | "two" | "buy";
	
	constructor(private _dateService: DateService, private _priceService: PriceService, private _branchStoreService: BranchStoreService,
				private _router: Router, private _itemService: ItemService) {
		this.remove = new EventEmitter<string>();
		this._type = "one";
	
	}
	
	ngOnInit() {
		this._itemService.getById(this.orderItem.item).then((item: Item) => {
			this.item = item;
		}).catch((blApiErr: BlApiError) => {
			console.log('could not get item');
		});
	}
	
	onTypeChange(type: "one" | "two" | "buy") {
		this._type = type;
	}
	
	
	onRemove() {
		this.remove.emit(this.orderItem.item);
	}
	
	getPrice(): number {
		if (this._type === "one") {
			this.orderItem.amount = this._priceService.oneSemester(this.item);
		} else if (this._type === "two") {
			this.orderItem.amount = this._priceService.twoSemesters(this.item);
		} else {
			this.orderItem.amount = this.orderItem.unitPrice;
		}
		return this.orderItem.amount;
	}
	
	
	showPrice(): boolean {
		if (!this.item) {
			return false;
		}
		return !this._branchStoreService.getCurrentBranch().payment.branchResponsible;
	}
	
	onItemClick() {
		this._router.navigateByUrl('i/' + this.orderItem.item);
	}
	
}
