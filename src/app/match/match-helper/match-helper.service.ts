import { Injectable } from "@angular/core";
import { MatchService } from "@boklisten/bl-connect";
import { Match, Item, CustomerItem } from "@boklisten/bl-model";
import { UserService } from "../../user/user.service";

@Injectable({
	providedIn: "root",
})
export class MatchHelperService {
	private currentMatch: Match;
	constructor(
		private matchService: MatchService,
		private userService: UserService
	) {}

	public getCurrentMatch(): Match {
		return this.currentMatch;
	}

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
				.then((userDetail) => {
					const match = {
						sender: {
							userId: userDetail.id,
							name: userDetail.name,
							email: userDetail.email,
							phone: userDetail.phone,
							meetingOptions: null,
						},
						recievers: [],
						items: items,
						state: "created",
						events: [{ type: "created", time: new Date() }],
						meetingPoint: null,
						branch: userDetail.branch,
					} as Match;

					this.matchService
						.add(match)
						.then((addedMatch) => {
							this.currentMatch = addedMatch;
							resolve(addedMatch);
						})
						.catch((matchAddErr) => {
							reject(matchAddErr);
						});
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}
