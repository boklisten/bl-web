import { Component, OnInit } from "@angular/core";
import { Item } from "@boklisten/bl-model";
import { ItemService } from "@boklisten/bl-connect";
import { PriceService } from "../../price/price.service";
import { BlcSortService } from "../../bl-common/services/blc-sort/blc-sort.service";

@Component({
	selector: "app-info-buyback",
	templateUrl: "./info-buyback.component.html",
	styleUrls: ["./info-buyback.component.scss"]
})
export class InfoBuybackComponent implements OnInit {
	public items: Item[];
	constructor(
		private itemService: ItemService,
		private blcSortService: BlcSortService
	) {}

	ngOnInit() {
		this.itemService
			.get({ query: "?buyback=true&og=title&og=price&og=info.isbn" })
			.then(items => {
				this.items = this.blcSortService.sortByField(items, "title");
			})
			.catch(() => {
				console.log("could not get items");
			});
		this.items = [];
	}
}
