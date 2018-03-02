import {Component, Input, OnInit} from '@angular/core';
import {BlApiError, BlApiNotFoundError, Branch, Item} from "bl-model";
import {ItemService} from "bl-connect";

@Component({
	selector: 'app-item-display-category',
	templateUrl: './item-display-category.component.html',
	styleUrls: ['./item-display-category.component.scss']
})
export class ItemDisplayCategoryComponent implements OnInit {
	
	@Input() branch: Branch;
	
	private items: Item[];
	private itemCategories: {name: string, items: Item[]}[];
	
	constructor(private _itemService: ItemService) {
		this.itemCategories = [];
		this.items = [];
	}
	
	ngOnInit() {
		console.log('we got the branch');
		for (const category of this.branch.itemCategories) {
			console.log('the category: ', category.name, category.items);
			this._itemService.getManyByIds(category.items).then((items: Item[]) => {
				this.itemCategories.push({name: category.name, items: items});
				console.log('got the items', this.itemCategories);
			}).catch((blApiErr: BlApiError) => {
				console.log('itemDisplayCategoryComponent: could not get items', blApiErr);
			});
		}
	}
}
