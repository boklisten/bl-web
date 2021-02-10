import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Item, CustomerItem } from "@boklisten/bl-model";
import { ItemService } from "@boklisten/bl-connect";

import { MatchItemChoice } from "../../match-item-choice";

@Component({
	selector: "app-match-select-item",
	templateUrl: "./match-select-item.component.html",
	styleUrls: ["./match-select-item.component.scss"]
})
export class MatchSelectItemComponent implements OnInit {
	@Input() customerItem: CustomerItem;
	@Output() selectedChoice: EventEmitter<{
		customerItem: CustomerItem;
		item: Item;
		choice: MatchItemChoice;
	}>;
	item: Item;

	public choice: MatchItemChoice;

	constructor(private itemService: ItemService) {
		this.selectedChoice = new EventEmitter();
	}

	ngOnInit() {
		this.clearChoice();
		this.itemService
			.getById(this.customerItem.item as string)
			.then((item: Item) => {
				this.item = item;
			})
			.catch(() => {});
	}

	public onChoice(value: "match" | "buyout") {
		if (this.choice[value]) {
			this.choice[value] = false;
		} else {
			this.clearChoice();
			this.choice[value] = true;
		}

		this.selectedChoice.emit({
			customerItem: this.customerItem,
			item: this.item,
			choice: this.choice
		});
	}

	private clearChoice() {
		this.choice = { match: false, buyout: false };
	}
}
