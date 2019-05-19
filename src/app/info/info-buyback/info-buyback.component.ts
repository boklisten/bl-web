import { Component, OnInit } from "@angular/core";
import { Item } from "@wizardcoder/bl-model";
import { ItemService } from "@wizardcoder/bl-connect";
import { PriceService } from "../../price/price.service";

@Component({
	selector: "app-info-buyback",
	templateUrl: "./info-buyback.component.html",
	styleUrls: ["./info-buyback.component.scss"]
})
export class InfoBuybackComponent implements OnInit {
	public items: Item[];
	constructor(
		private itemService: ItemService,
		private priceService: PriceService
	) {}

	ngOnInit() {
		/*
		this.itemService
			.get()
			.then(items => {
				this.items = items;
			})
			.catch(() => {
				console.log("could not get items");
			});
     */
		this.items = [];
	}

	public getPrice(item: Item) {
		return this.priceService.calculateBuybackPrice(item);
	}
}