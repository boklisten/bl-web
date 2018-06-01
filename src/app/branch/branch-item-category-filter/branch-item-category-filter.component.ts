import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Branch} from "@wizardcoder/bl-model";

@Component({
	selector: 'app-branch-item-category-filter',
	templateUrl: './branch-item-category-filter.component.html',
	styleUrls: ['./branch-item-category-filter.component.scss']
})
export class BranchItemCategoryFilterComponent implements OnInit {

	@Input() branchItemCategories: string[];
	@Output() branchItemCategoriesSelect: EventEmitter<string[]>;

	public selectedCategoryNames: string[];

	constructor() {
		this.selectedCategoryNames = [];
		this.branchItemCategoriesSelect = new EventEmitter<string[]>();
	}


	ngOnInit() {
		this.branchItemCategoriesSelect.emit([]);
	}

	onSelectCategory(categoryName: string) {
		if (!this.contains(categoryName)) {
			this.selectedCategoryNames.push(categoryName);
		} else {
			this.removeCategory(categoryName);
		}

		this.branchItemCategoriesSelect.emit(this.selectedCategoryNames);
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
