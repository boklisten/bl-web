import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item, OrderItem} from "bl-model";
import {DateService} from "../../date/date.service";
import {PriceService} from "../../price/price.service";
import {BranchStoreService} from "../../branch/branch-store.service";

@Component({
	selector: 'app-cart-item',
	templateUrl: './cart-item.component.html',
	styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
	
	@Input() orderItem: OrderItem;
	@Output() remove: EventEmitter<string>;
	
	public semester: "one" | "two" = "one";
	
	constructor(private _dateService: DateService, private _priceService: PriceService, private _branchStoreService: BranchStoreService) {
		this.remove = new EventEmitter<string>();
	
	}
	
	ngOnInit() {
	}
	
	onSemesterUpdate() {
		if (this.semester === "two") {
			this.orderItem.rentInfo.oneSemester = true;
			this.orderItem.rentInfo.twoSemesters = false;
		} else {
			this.orderItem.rentInfo.oneSemester = false;
			this.orderItem.rentInfo.twoSemesters = true;
		}
		console.log('semester update', this.semester, this.orderItem);
	}
	
	onRemove() {
		this.remove.emit(this.orderItem.item);
	}
	
	getPrice(): number {
		this.orderItem.amount = this._priceService.calculatePrice(this.orderItem, this.semester);
		return this.orderItem.amount;
	}
	
	getDate(): string {
		return this._dateService.getDate(this.semester);
	}
	
	showPrice(): boolean {
		return !this._branchStoreService.getCurrentBranch().payment.branchResponsible;
	}
	
}
