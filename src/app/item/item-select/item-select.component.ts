import { Component, OnInit } from "@angular/core";
import { Branch, Item } from "@boklisten/bl-model";
import { Router, ActivatedRoute } from "@angular/router";
import { BranchStoreService } from "../../branch/branch-store.service";
import { BranchService, StorageService } from "@boklisten/bl-connect";
import { UrlPathEditService } from "../../bl-common/services/url-path-edit/url-path-edit.service";
import { CartService } from "../../cart/cart.service";
import { UserService } from "../../user/user.service";

@Component({
	selector: "app-item-select",
	templateUrl: "./item-select.component.html",
	styleUrls: ["./item-select.component.scss"],
})
export class ItemSelectComponent implements OnInit {
	public items: Item[];
	public branch: Branch;
	public selectedCategories: string[];
	public cartSize: number;
	public autoAdd: boolean;
	public showPartlyPaymentInfo = false;
	public isUserDetailValid = true;

	constructor(
		private _router: Router,
		private _branchStoreService: BranchStoreService,
		private _branchService: BranchService,
		private _route: ActivatedRoute,
		private _urlPathEditService: UrlPathEditService,
		private _cartService: CartService,
		private _storageService: StorageService,
		private _userService: UserService
	) {
		this.selectedCategories = [];
		this.items = [];
		this.autoAdd = false;
	}

	ngOnInit() {
		const branchId = this._route.snapshot.queryParamMap.get("branch");

		this._cartService.onCartChange().subscribe(() => {
			this.cartSize = this._cartService.getSize();
		});

		this._userService.isUserDetailValid().then((isValid) => {
			this.isUserDetailValid = isValid;
		});

		if (branchId) {
			this._branchService
				.getById(branchId)
				.then((branch) => {
					this.branch = branch;
					this.showPartlyPaymentInfo =
						this.branch.paymentInfo.partlyPaymentPeriods.length > 0;
				})
				.catch(() => {
					this.setBranchFromStore();
				});
		} else {
			this.setBranchFromStore();
		}

		this.selectedCategories = this.getCategories();

		if (this.selectedCategories.length > 0) {
			this.autoAdd = true;
		}
	}

	public navigateToUserDetails() {
		this._router.navigate(["/u/edit"]);
	}

	private getCategories(): string[] {
		let queryCategories = this._urlPathEditService.urlWordsToSentence(
			this._route.snapshot.queryParamMap.getAll("category")
		);

		if (queryCategories && queryCategories.length > 0) {
			this._storageService.add(
				"bl-item-categories",
				JSON.stringify(queryCategories)
			);
		} else {
			try {
				queryCategories = JSON.parse(
					this._storageService.get("bl-item-categories")
				);
			} catch (e) {
				queryCategories = [];
			}
		}
		return queryCategories;
	}

	private setBranchFromStore() {
		this.branch = this._branchStoreService.getBranch();
	}
}
