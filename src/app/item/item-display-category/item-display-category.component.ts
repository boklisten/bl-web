import {Component, Input, OnInit} from '@angular/core';
import {BlApiError, BlApiNotFoundError, Branch, Item} from "@wizardcoder/bl-model";
import {ItemService} from "@wizardcoder/bl-connect";

@Component({
	selector: 'app-item-display-category',
	templateUrl: './item-display-category.component.html',
	styleUrls: ['./item-display-category.component.scss']
})
export class ItemDisplayCategoryComponent implements OnInit {
	
	@Input() branch: Branch;
	
	items: Item[];
	itemCategories: {name: string, items: Item[]}[];
	selectedItemCategories: {name: string, items: Item[]}[];
	
	constructor(private _itemService: ItemService) {
		this.itemCategories = [];
		this.selectedItemCategories = [];
		this.items = [];
	}
	
	ngOnInit() {
		for (const category of this.branch.itemCategories) {
			this._itemService.getManyByIds(category.items).then((items: Item[]) => {
				this.itemCategories.push({name: category.name, items: items});
				this.selectedItemCategories.push({name: category.name, items: items});
			}).catch((blApiErr: BlApiError) => {
				console.log('itemDisplayCategoryComponent: could not get items', blApiErr);
			});
		}
	}
	
	onItemCategoryFilterChange(itemCategoryFilters: string[]) {
		let selectedCategories: {name: string, items: Item[]}[] = [];
		
		for (let i = itemCategoryFilters.length; i >= 0; i--) {
			for (const itemCategory of this.itemCategories) {
				if (itemCategory.name === itemCategoryFilters[i]) {
					selectedCategories.push(itemCategory);
				}
			}
		}
		
		if (selectedCategories.length <= 0) {
			selectedCategories = this.itemCategories;
		}
		
		this.selectedItemCategories = selectedCategories;
	}
}
