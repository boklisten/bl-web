import { Injectable } from "@angular/core";
import { MatchService } from "@wizardcoder/bl-connect";
import { Match, Item, CustomerItem } from "@wizardcoder/bl-model";
import { UserService } from "../../user/user.service";

@Injectable({
	providedIn: "root"
})
export class MatchHelperService {
	constructor(
		private matchService: MatchService,
		private userService: UserService
	) {}

	public createMatch(
		items: {
			item: string; // id of the item in DB
			customerItem?: string;
			title: string; // title of the item
			reciever: string; // userId of the reciever
			rating?: {
				sender?: number; // a number between 0-5
				reciever?: number; // a number between 0-5
			};
			sent?: { time: Date };
			recieved?: { time: Date };
		}[]
	): Promise<Match> {
		return new Promise((resolve, reject) => {
			this.userService
				.getUserDetail()
				.then(userDetail => {
					const match: Match = {
						id: null,
						sender: {
							userId: userDetail.id,
							name: userDetail.name,
							email: userDetail.email,
							phone: userDetail.phone,
							meetingOptions: null
						},
						recievers: [],
						items: items,
						state: "created",
						events: [{ type: "created", time: new Date() }],
						meetingPoint: null,
						branch: null
					};

					this.matchService
						.add(match)
						.then(() => {
							resolve(match);
						})
						.catch(matchAddErr => {
							reject(matchAddErr);
						});
				})
				.catch(err => {
					reject(err);
				});
		});
	}
}
