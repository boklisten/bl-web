import { Injectable } from "@angular/core";
import { MatchService } from "@boklisten/bl-connect";
import { Match } from "@boklisten/bl-model";
import { Subject, Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class MatchStoreService {
	private currentMatch: Match;
	private matchChange$: Subject<boolean>;

	constructor(private matchService: MatchService) {
		this.matchChange$ = new Subject();
	}

	public getMatch(): Match {
		return this.currentMatch;
	}

	public onMatchChange(): Observable<boolean> {
		return this.matchChange$.asObservable();
	}

	public setMatch(id: string): Promise<Match> {
		return new Promise((resolve, reject) => {
			this.matchService
				.getById(id)
				.then((match) => {
					this.currentMatch = match;
					this.matchChange$.next(true);
					resolve(match);
				})
				.catch((err) => {
					this.currentMatch = null;
					this.matchChange$.next(true);
					reject(err);
				});
		});
	}

	public addHandoverItems(
		customer: string,
		items: { selected: boolean; item: string; title: string }[],
		sender?: boolean
	) {
		return new Promise((resolve, reject) => {
			// get latest version of match,
			// add info about sent/recieved

			let time = new Date();
			this.matchService
				.getById(this.currentMatch.id)
				.then((match) => {
					for (let item of items) {
						for (let matchItem of match.items) {
							if (matchItem.item === item.item && item.selected) {
								if (sender && !matchItem.sent) {
									matchItem.sent = {
										time: time,
										user: customer,
									};
								} else if (!matchItem.recieved) {
									matchItem.recieved = {
										time: time,
										user: customer,
									};
								}
							}
						}
					}

					match.events.push({
						type: sender ? "items-sent" : ("items-recieved" as any),
						time: time,
						userId: customer,
					});

					this.matchService
						.update(match.id, {
							items: match.items,
							events: match.events,
						})
						.then((updatedMatch) => {
							resolve(match);
						})
						.catch((e) => {
							reject(e);
						});
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}
