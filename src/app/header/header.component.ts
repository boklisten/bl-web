import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BranchStoreService } from "../branch/branch-store.service";
import { UserService } from "../user/user.service";
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";
import { CartService } from "../cart/cart.service";
import { environment } from "../../environments/environment";

export type MenuItem =
	| "info"
	| "branch"
	| "cart"
	| "items"
	| "user-settings"
	| "user-items"
	| "user-orders"
	| "logout"
	| "login"
	| "register"
	| "user-home"
	| "home";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
	public showMenu: boolean;
	public cartSize: number;
	private outsideClick: boolean;
	public isDevEnvironment: boolean;

	constructor(
		private _router: Router,
		private _branchStoreService: BranchStoreService,
		private _userService: UserService,
		private _cartService: CartService,
		private _dropdownConfig: NgbDropdownConfig
	) {
		this.showMenu = false;
		this.outsideClick = false;
		this.isDevEnvironment = !environment.production;

		this._dropdownConfig.placement = "bottom";
		this.cartSize = this._cartService.getSize();
	}

	ngOnInit() {
		this._cartService.onCartChange().subscribe(() => {
			this.cartSize = this._cartService.getSize();
		});
	}

	public onOrderItemsClick() {
		if (this.cartSize > 0) {
			this._router.navigate(["/i/select"]);
		} else {
			this._router.navigate(["/bestilling"]);
		}
	}

	public onMenuClick() {
		this.showMenu = !this.showMenu;
		setTimeout(() => {
			this.outsideClick = !this.outsideClick;
		}, 1);
	}

	public onInsideMenuClick() {
		setTimeout(() => {
			this.outsideClick = false;
		}, 1);
	}

	public isLoggedIn() {
		return this._userService.loggedIn();
	}

	public outsideMenuClick(e) {
		if (this.outsideClick) {
			this.showMenu = false;
		}
		this.outsideClick = false;
	}
}
