import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../user/user.service";
import { CustomerItem, Match, Item } from "@wizardcoder/bl-model";
import { MatchItemChoice } from "../match-item-choice";
import { MatchHelperService } from "../match-helper/match-helper.service";
import { DateService } from "../../date/date.service";

@Component({
	selector: "app-match-select",
	templateUrl: "./match-select.component.html",
	styleUrls: ["./match-select.component.scss"]
})
export class MatchSelectComponent implements OnInit {
	public customerItems: CustomerItem[];
	public wait: boolean;
	public matchChoices: {
		customerItem: CustomerItem;
		item: Item;
		choice: MatchItemChoice;
	}[] = [];
	public noDeadlineSpecifiedError: boolean;
	public noCustomerItemsFoundError: boolean;

	constructor(
		private userService: UserService,
		private matchHelperService: MatchHelperService,
		private router: Router,
		private route: ActivatedRoute,
		private dateService: DateService
	) {
		this.matchChoices = [];
	}

	ngOnInit() {
		let deadline = this.route.snapshot.queryParamMap.get("deadline");
		if (!deadline) {
			deadline = this.route.snapshot.queryParamMap.get("d");
		}

		const deadlineDate = this.dateService.convertFromFormat(
			deadline,
			"DDMMYY"
		);

		this.userService
			.getCustomerItems()
			.then(customerItems => {
				if (deadline) {
					let validCustomerItems = [];
					for (let customerItem of customerItems) {
						try {
							if (
								this.dateService.isBetweenDays(
									deadlineDate,
									customerItem.deadline,
									1,
									1
								) &&
								!customerItem.match
							) {
								validCustomerItems.push(customerItem);
							}
						} catch (e) {
							console.log("err", e);
						}
					}
					this.customerItems = validCustomerItems;
					if (this.customerItems.length <= 0) {
						this.noCustomerItemsFoundError = true;
					}
				} else {
					this.noDeadlineSpecifiedError = true;
				}
			})
			.catch(() => {});
	}

	public onConfirm() {
		let matchItems = [];
		this.wait = true;

		for (let matchChoices of this.matchChoices) {
			if (matchChoices.choice.match) {
				matchItems.push({
					item: matchChoices.item.id,
					customerItem: matchChoices.customerItem.id,
					title: matchChoices.item.title,
					reciever: null
				});
			}
		}

		if (matchItems.length <= 0) {
			this.router.navigate(["/u/items"]);
			return;
		}

		this.matchHelperService
			.createMatch(matchItems)
			.then(match => {
				this.wait = false;
				this.router.navigate(["/match/next-steps"]);
			})
			.catch(err => {
				this.wait = false;
			});
	}

	public canConfirm(): boolean {
		if (
			!this.customerItems ||
			!this.matchChoices ||
			this.matchChoices.length < this.customerItems.length
		) {
			return false;
		}
		for (const matchChoice of this.matchChoices) {
			if (!matchChoice.choice.match && !matchChoice.choice.buyout) {
				return false;
			}
		}
		return true;
	}

	public onSelectChoice(matchChoice: {
		customerItem: CustomerItem;
		item: Item;
		choice: MatchItemChoice;
	}) {
		for (let mc of this.matchChoices) {
			if (mc.customerItem === matchChoice.customerItem) {
				mc.choice = matchChoice.choice;
				return;
			}
		}
		this.matchChoices.push({
			customerItem: matchChoice.customerItem,
			item: matchChoice.item,
			choice: matchChoice.choice
		});
	}
}
