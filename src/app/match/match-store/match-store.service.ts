import { Injectable } from "@angular/core";
import { MatchService } from "@wizardcoder/bl-connect";
import { Match } from "@wizardcoder/bl-model";
import { Subject, Observable } from "rxjs";

@Injectable({
	providedIn: "root"
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
				.then(match => {
					this.currentMatch = match;
					this.matchChange$.next(true);
					resolve(match);
				})
				.catch(err => {
					this.currentMatch = null;
					this.matchChange$.next(true);
					reject(err);
				});
		});
	}
}
