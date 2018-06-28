import {Component, Input, OnInit} from '@angular/core';
import {BlApiError, CustomerItem, UserDetail} from "@wizardcoder/bl-model";
import {CustomerItemService} from "@wizardcoder/bl-connect";
import {UserService} from "../user.service";

@Component({
	selector: 'app-user-item',
	templateUrl: './user-item.component.html',
	styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

	public customerItems: CustomerItem[];

	constructor(private _customerItemService: CustomerItemService,
				private _userService: UserService) {
		this.customerItems = [];
	}

	ngOnInit() {
		this._userService.getUserDetail().then((userDetail: UserDetail) => {
			this._customerItemService.getManyByIds(userDetail.customerItems).then((customerItems: CustomerItem[]) => {
				this.customerItems = customerItems;
			}).catch((customerItemsError: BlApiError) => {
				console.log('userItemComponent: could not get customerItems', customerItemsError);
			});
		}).catch((blApiErr: BlApiError) => {
			console.log('UserItemComponent: could not get items: ', blApiErr);
		});
	}

}
