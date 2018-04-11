import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Branch, CustomerItem, Item} from "@wizardcoder/bl-model";
import {DateService} from "../../date/date.service";
import {CartService} from "../../cart/cart.service";
import {PriceService} from "../../price/price.service";
import {BranchStoreService} from "../../branch/branch-store.service";

@Component({
	selector: 'app-item-type-select',
	templateUrl: './item-type-select.component.html',
	styleUrls: ['./item-type-select.component.scss']
})
export class ItemTypeSelectComponent implements OnInit {
	
	@Input() item: Item;
	@Input() customerItem: CustomerItem;
	@Output() type: EventEmitter<string>;
	
	public typeSelect: "one" | "two" | "buy" | "buyout" | "extend";
	public desc: string;
	public date: string;
	
	public rentSemesterOption: boolean;
	public rentYearOption: boolean;
	public buyOption: boolean;
	public buyoutOption: boolean;
	public extendOption: boolean;
	private branch: Branch;
	
	constructor(private _dateService: DateService, private _cartService: CartService, private _priceService: PriceService,
				private _branchStoreService: BranchStoreService) {
		this.type = new EventEmitter<string>();
		this.typeSelect = 'one';
		this.desc = '';
	}
	
	
	ngOnInit() {
		this.updateBasedOnCart();
		
		this.branch = this._branchStoreService.getBranch();
		
		this.calculateOptions(this.item);
		
	}
	
	calculateOptions(item: Item) {
		let firstOption = true;
		
		if (item.rent) {
			
			
			for (const rentPeriod of this.branch.paymentInfo.rentPeriods) {
				
				if (rentPeriod.type === 'semester') {
					this.rentSemesterOption = true;
					if (firstOption) {
						this.onTypeUpdate('one');
					}
				} else if (rentPeriod.type === 'year') {
					this.rentYearOption = true;
					if (firstOption) {
						this.onTypeUpdate('two');
					}
				}
				firstOption = false;
			}
			
		}
		
		if (item.buy) {
			this.buyOption = true;
			
			if (firstOption) {
				this.onTypeUpdate('buy');
			}
		}
	}
	
	showDate(): boolean {
		return (this.typeSelect !== "buy");
	}
	
	isCustomerItem(): boolean {
		return !(!this.customerItem);
	}
	
	public onTypeUpdate(type: "one" | "two" | "buy" | "buyout" | "extend") {
		if (this._cartService.contains(this.item.id)) {
			this._cartService.updateType(this.item.id, type);
		}
		this.desc = this.getDesc(type);
		this.date = this.getDate(type);
		this.typeSelect = type;
		this.type.emit(type);
	}
	
	private getDesc(type: "one" | "two" | "buy" | "buyout" | "extend") {
		switch (type) {
			case "one":
				return "rent to " + this.getDate(type);
			case "two":
				return "rent to " + this.getDate(type);
			case "buy":
				return "buy this item";
			case "buyout":
				return "buyout this item";
			case "extend":
				return "extend deadline to " + this.getDate(type);
		}
	}
	
	public getDate(type): string {
		return this._dateService.getDate(type);
	}
	
	updateBasedOnCart() {
		if (this._cartService.contains(this.item.id)) {
			const orderItem = this._cartService.get(this.item.id);
			
			if (orderItem.type === "rent") {
				if (orderItem.info.periodType === "semester") {
					this.typeSelect = "one";
				} else if (orderItem.info.periodType === "year") {
					this.typeSelect = "two";
				}
			} else if (orderItem.type === "buy") {
				this.typeSelect = "buy";
			} else if (orderItem.type === "buyout") {
				this.typeSelect = "buyout";
			} else if (orderItem.type === "extend") {
				this.typeSelect = "extend";
			}
		}
		this.type.emit(this.typeSelect);
		this.desc = this.getDesc(this.typeSelect);
	}
	
	public showPrice(): boolean {
		return this._priceService.showPrice();
	}
	
}
