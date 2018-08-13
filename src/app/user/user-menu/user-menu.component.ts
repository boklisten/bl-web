import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from "../../header/header.component";
import {Router} from "@angular/router";
import {UserService} from "../user.service";

@Component({
	selector: 'app-user-menu',
	templateUrl: './user-menu.component.html',
	styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
	@Input() showMenu: boolean;
	@Output() showMenuChange: EventEmitter<boolean>;

	constructor(private _router: Router, private _userService: UserService) {
		this.showMenuChange = new EventEmitter<boolean>();
	}

	ngOnInit() {
	}

	public onMenuItemClick(menuItem: MenuItem) {
		if (menuItem === 'items') {
			this._router.navigateByUrl('/i/select');
		} else if (menuItem === 'branch') {
			this._router.navigateByUrl('/b/info');
		} else if (menuItem === 'cart') {
			this._router.navigateByUrl('/cart');
		} else if (menuItem === 'info') {
			this._router.navigateByUrl('/info');
		} else if (menuItem === 'user-settings') {
			this._router.navigateByUrl('/u/edit');
		} else if (menuItem === 'user-items') {
			this._router.navigateByUrl('/u/items');
		} else if (menuItem === 'user-orders') {
			this._router.navigateByUrl('/u/order');
		} else if (menuItem === 'user-home') {
			this._router.navigateByUrl('/u/home');
		} else if (menuItem === 'logout') {
			this._userService.logout().then(() => {
				this._router.navigateByUrl('logout');
			});
		} else if (menuItem === 'login') {
			this._router.navigateByUrl('/auth/login');
		} else if (menuItem === 'register') {
			this._router.navigateByUrl('/auth/register');
		} else if (menuItem === 'home') {
			this._router.navigateByUrl('/');
		}

		this.onMenuClick();
	}

	public onMenuClick() {
		this.showMenuChange.emit(!this.showMenu);
	}

	public isLoggedIn() {
		return this._userService.loggedIn();
	}

}
