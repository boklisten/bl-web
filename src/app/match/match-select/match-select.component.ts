import { Component, OnInit } from "@angular/core";
import { UserService } from "../../user/user.service";
import { CustomerItem } from "@wizardcoder/bl-model";

@Component({
	selector: "app-match-select",
	templateUrl: "./match-select.component.html",
	styleUrls: ["./match-select.component.scss"]
})
export class MatchSelectComponent implements OnInit {
	public customerItems: CustomerItem[];

	constructor(private userService: UserService) {}

	ngOnInit() {
		this.userService
			.getCustomerItems()
			.then(customerItems => {
				this.customerItems = customerItems;
			})
			.catch(() => {});
	}
}
