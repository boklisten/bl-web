import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Branch } from "@boklisten/bl-model";

@Component({
	selector: "app-branch-item-category-filter",
	templateUrl: "./branch-item-category-filter.component.html",
	styleUrls: ["./branch-item-category-filter.component.scss"]
})
export class BranchItemCategoryFilterComponent implements OnInit {
	@Input() branchItemCategories: string[];
	@Input() selectedCategories: string[];
	@Output() branchItemCategoriesSelect: EventEmitter<string[]>;

	public selectedCategoryNames: string[];
	public display: boolean;

	constructor() {
		this.selectedCategoryNames = [];
		this.branchItemCategoriesSelect = new EventEmitter<string[]>();
	}

	ngOnInit() {
		this.branchItemCategoriesSelect.emit([]);
		this.branchItemCategories.sort();
		this.preselectCategories(this.selectedCategories);
	}

	private preselectCategories(selectedCategories: string[]) {
		for (const categoryName of selectedCategories) {
			this.onSelectCategory(categoryName);
		}
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
