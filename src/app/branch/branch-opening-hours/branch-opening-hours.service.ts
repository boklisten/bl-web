import { Injectable } from "@angular/core";
import { BlApiError, Branch, OpeningHour } from "@wizardcoder/bl-model";
import { OpeningHourService } from "@wizardcoder/bl-connect";
import { DateService } from "../../date/date.service";

@Injectable()
export class BranchOpeningHoursService {
	constructor(
		private _openingHourService: OpeningHourService,
		private _dateService: DateService
	) {}

	public getOpeningHours(branch: Branch): Promise<OpeningHour[]> {
		return new Promise((resolve, reject) => {
			const openingHourProms: Promise<OpeningHour>[] = [];

			for (const openingHourId of branch.openingHours) {
				openingHourProms.push(
					this._openingHourService.getById(openingHourId as string)
				);
			}

			Promise.all(openingHourProms)
				.then((openingHours: OpeningHour[]) => {
					resolve(this._dateService.sortOpeningHours(openingHours));
				})
				.catch((blApiError: BlApiError) => {
					reject(blApiError);
				});
		});
	}
}
