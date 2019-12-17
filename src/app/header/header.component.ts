import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BranchStoreService } from "../branch/branch-store.service";
import { UserService } from "../user/user.service";
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";
import { CartService } from "../cart/cart.service";

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
	styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
	public showMenu: boolean;
	public cartSize: number;

	constructor(
		private _router: Router,
		private _branchStoreService: BranchStoreService,
		private _userService: UserService,
		private _cartService: CartService,
		private _dropdownConfig: NgbDropdownConfig
	) {
		this.showMenu = false;

		this._dropdownConfig.placement = "bottom";
		this.cartSize = this._cartService.getSize();
	}

	ngOnInit() {
		this._cartService.onCartChange().subscribe(() => {
			this.cartSize = this._cartService.getSize();
		});
	}

	public onMenuItemClick(menuItem: MenuItem) {
		if (menuItem === "items") {
			this._router.navigateByUrl("/i/select");
		} else if (menuItem === "branch") {
			this._router.navigateByUrl("/b/info");
		} else if (menuItem === "cart") {
			this._router.navigateByUrl("/cart");
		} else if (menuItem === "info") {
			this._router.navigateByUrl("/info");
		} else if (menuItem === "user-settings") {
			this._router.navigateByUrl("/u/edit");
		} else if (menuItem === "user-items") {
			this._router.navigateByUrl("/u/items");
		} else if (menuItem === "user-orders") {
			this._router.navigateByUrl("/u/order");
		} else if (menuItem === "user-home") {
			this._router.navigateByUrl("/u/home");
		} else if (menuItem === "logout") {
			this._userService.logout().then(() => {
				this._router.navigateByUrl("logout");
			});
		} else if (menuItem === "login") {
			this._router.navigateByUrl("/auth/login");
		} else if (menuItem === "register") {
			this._router.navigateByUrl("/auth/register");
		} else if (menuItem === "home") {
			this._router.navigateByUrl("/");
		}

		this.showMenu = false;
	}

	public onMenuClick() {
		this.showMenu = !this.showMenu;
	}

	public isLoggedIn() {
		return this._userService.loggedIn();
	}
}
