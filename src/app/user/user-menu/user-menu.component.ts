import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MenuItem } from "../../header/header.component";
import { Router } from "@angular/router";
import { UserService } from "../user.service";

@Component({
	selector: "app-user-menu",
	templateUrl: "./user-menu.component.html",
	styleUrls: ["./user-menu.component.scss"]
})
export class UserMenuComponent implements OnInit {
	@Input() showMenu: boolean;
	@Output() showMenuChange: EventEmitter<boolean>;

	constructor(private _router: Router, private _userService: UserService) {
		this.showMenuChange = new EventEmitter<boolean>();
	}

	ngOnInit() {}

	public onMenuClick() {
		this.showMenuChange.emit(!this.showMenu);
	}

	public isLoggedIn() {
		return this._userService.loggedIn();
	}
}
