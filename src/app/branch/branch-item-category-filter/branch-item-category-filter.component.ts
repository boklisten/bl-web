import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Branch} from "bl-model";

@Component({
	selector: 'app-branch-item-category-filter',
	templateUrl: './branch-item-category-filter.component.html',
	styleUrls: ['./branch-item-category-filter.component.scss']
})
export class BranchItemCategoryFilterComponent implements OnInit {
	
	@Input() branch: Branch;
	@Output() itemCategories: EventEmitter<string[]>;
	public selectedCategoryNames: string[];
	public itemCategoryNames: string[];
	
	constructor() {
		this.itemCategoryNames = [];
		this.selectedCategoryNames = [];
		this.itemCategories = new EventEmitter<string[]>();
	}
	
	
	ngOnInit() {
		for (const itemCategory of this.branch.itemCategories) {
			this.itemCategoryNames.push(itemCategory.name);
		}
	}
	
	onSelectCategory(categoryName: string) {
		if (!this.contains(categoryName)) {
			this.selectedCategoryNames.push(categoryName);
		} else {
			this.removeCategory(categoryName);
		}
		this.itemCategories.emit(this.selectedCategoryNames);
	}
	
	private removeCategory(name: string) {
		for (let i = 0; i < this.selectedCategoryNames.length; i++) {
			if (this.selectedCategoryNames[i] === name) {
				this.selectedCategoryNames.splice(i, 1);
			}
		}
	}
	
	
	contains(name: string) {
		for (const categoryName of this.selectedCategoryNames) {
			if (categoryName === name) {
				return true;
			}
		}
		
		return false;
	}
	
}
