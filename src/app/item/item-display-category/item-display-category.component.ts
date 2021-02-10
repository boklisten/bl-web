import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
	BlApiError,
	BlApiNotFoundError,
	Branch,
	BranchItem,
	Item
} from "@boklisten/bl-model";
import { CartService } from "../../cart/cart.service";
import { BranchItemService, ItemService } from "@boklisten/bl-connect";

@Component({
	selector: "app-item-display-category",
	templateUrl: "./item-display-category.component.html",
	styleUrls: ["./item-display-category.component.scss"]
})
export class ItemDisplayCategoryComponent implements OnInit {
	@Input() branch: Branch;
	@Input() selectedCategories: string[];
	@Input() autoAdd: boolean;

	items: Item[];
	selectedBranchItemCategories: { name: string; branchItems: BranchItem[] }[];
	branchItems: BranchItem[];
	branchItemCategories: { name: string; branchItems: BranchItem[] }[];
	branchItemCategoryNames: string[];
	loading: boolean;
	noItemsWarning: boolean;
	cartSize: number;

	constructor(
		private _itemService: ItemService,
		private _branchItemService: BranchItemService,
		private _router: Router,
		private _cartService: CartService
	) {
		this.selectedBranchItemCategories = [];
		this.items = [];
		this.branchItems = [];
		this.branchItemCategories = [];
		this.branchItemCategoryNames = [];
		this.cartSize = 0;
	}

	ngOnInit() {
		this.noItemsWarning = false;

		this.cartSize = this._cartService.getSize();

		this._cartService.onCartChange().subscribe(() => {
			this.cartSize = this._cartService.getSize();
		});

		if (this.branch) {
			this.loading = true;

			this._branchItemService
				.get({ query: "?branch=" + this.branch.id })
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

					this.preselectCategories(this.selectedCategories);

					if (this.branchItemCategoryNames.length <= 0) {
						this.noItemsWarning = true;
					}
				})
				.catch(getBranchItemError => {
					console.log(
						"ItemDisplayCategoryComponent: could not get branch items",
						getBranchItemError
					);
					this.loading = false;
					this.noItemsWarning = true;
				});
		}
	}

	public preselectCategories(branchItemCategoryFilter: string[]) {
		let selectedCategories: {
			name: string;
			branchItems: BranchItem[];
		}[] = [];

		for (let filterCategory of branchItemCategoryFilter) {
			for (const branchItemCategory of this.branchItemCategories) {
				if (branchItemCategory.name === filterCategory) {
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

	public goToBranchSelect() {
		this._router.navigate(["/fastbuy/courses"], {
			queryParams: {
				branch: this.branch.id,
				category: this.getSelectedCategories()
			}
		});
	}
	private getSelectedCategories() {
		const categories = [];
		for (const category of this.selectedCategories) {
			categories.push(category);
		}
		return categories;
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
