import {Injectable} from '@angular/core';
import {BlApiError, Branch, OpeningHour} from "bl-model";
import {OpeningHourService} from "bl-connect";

@Injectable()
export class BranchOpeningHoursService {
	
	constructor(private _openingHourService: OpeningHourService) {
	
	}
	
	public getOpeningHours(branch: Branch): Promise<OpeningHour[]> {
		return new Promise((resolve, reject) => {
			
			const openingHourProms: Promise<OpeningHour>[] = [];
			
			for (const openingHourId of branch.openingHours) {
				openingHourProms.push(this._openingHourService.getById(openingHourId));
			}
			
			Promise.all(openingHourProms).then((openingHours: OpeningHour[]) => {
				resolve(openingHours);
			}).catch((blApiError: BlApiError) => {
				reject(blApiError);
			});
		});
	}
	
}
