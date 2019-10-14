import { Component, Input, OnInit } from "@angular/core";
import {
	BlApiError,
	BlApiNotFoundError,
	Branch,
	BranchItem,
	Item
} from "@wizardcoder/bl-model";
import { BranchItemService, ItemService } from "@wizardcoder/bl-connect";

@Component({
	selector: "app-item-display-category",
	templateUrl: "./item-display-category.component.html",
	styleUrls: ["./item-display-category.component.scss"]
})
export class ItemDisplayCategoryComponent implements OnInit {
	@Input() branch: Branch;
	@Input() selectedCategories: string[];

	items: Item[];
	selectedBranchItemCategories: { name: string; branchItems: BranchItem[] }[];
	branchItems: BranchItem[];
	branchItemCategories: { name: string; branchItems: BranchItem[] }[];
	branchItemCategoryNames: string[];
	loading: boolean;
	noItemsWarning: boolean;

	constructor(
		private _itemService: ItemService,
		private _branchItemService: BranchItemService
	) {
		this.selectedBranchItemCategories = [];
		this.items = [];
		this.branchItems = [];
		this.branchItemCategories = [];
		this.branchItemCategoryNames = [];
	}

	ngOnInit() {
		this.noItemsWarning = false;

		if (this.branch) {
			if (
				!this.branch.branchItems ||
				this.branch.branchItems.length <= 0
			) {
				this.noItemsWarning = true;
			} else {
				this.loading = true;
				this._branchItemService
					.getManyByIds(this.branch.branchItems as string[])
					.then((branchItems: BranchItem[]) => {
						this.branchItems = branchItems;

						for (const branchItem of this.branchItems) {
							if (
								!branchItem.buy &&
								!branchItem.rent &&
								!branchItem.partlyPayment
							) {
								// no action valid in bl-web
								continue;
							}
							this.addBranchItemToCategory(branchItem);
						}

						this.loading = false;

						if (this.branchItemCategoryNames.length <= 0) {
							this.noItemsWarning = true;
						}
					})
					.catch(getBranchItemError => {
						console.log(
							"ItemDisplayCategoryComponent: could not get branch items"
						);
						this.loading = false;
						this.noItemsWarning = true;
					});
			}
		}
	}

	onBranchItemCategoryFilterChange(branchItemCategoryFilter: string[]) {
		let selectedCategories: {
			name: string;
			branchItems: BranchItem[];
		}[] = [];

		for (let i = branchItemCategoryFilter.length; i >= 0; i--) {
			for (const branchItemCategory of this.branchItemCategories) {
				if (branchItemCategory.name === branchItemCategoryFilter[i]) {
					selectedCategories.push(branchItemCategory);
				}
			}
		}

		if (selectedCategories.length <= 0) {
			selectedCategories = this.branchItemCategories;
		}

		this.selectedBranchItemCategories = selectedCategories;

		this.selectedBranchItemCategories.sort((a: any, b: any) => {
			const nameA = a.name.toUpperCase();
			const nameB = b.name.toUpperCase();
			if (nameA < nameB) {
				return -1;
			} else if (nameA > nameB) {
				return 1;
			}
			return 0;
		});
	}

	private addBranchItemToCategory(branchItem: BranchItem) {
		if (!branchItem.categories || branchItem.categories.length <= 0) {
			this.branchItemCategories.push({
				name: "",
				branchItems: [branchItem]
			});
			return;
		}

		for (const category of branchItem.categories) {
			let foundCategory = false;

			for (let i = 0; i < this.branchItemCategories.length; i++) {
				if (this.branchItemCategories[i].name === category) {
					this.branchItemCategories[i].branchItems.push(branchItem);
					foundCategory = true;
				}
			}

			if (!foundCategory) {
				this.branchItemCategories.push({
					name: category,
					branchItems: [branchItem]
				});
				this.branchItemCategoryNames.push(category);
			}
		}
	}
}
