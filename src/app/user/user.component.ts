import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	public username: string;
	
	constructor(private _userService: UserService) {
	}
	
	ngOnInit() {
		this.username = this._userService.getUserName();
	}
	
	
	
}
