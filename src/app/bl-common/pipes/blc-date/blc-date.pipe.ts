import {Pipe, PipeTransform} from '@angular/core';
import {DateService} from "../../../date/date.service";

type DateFormat = 'date' | 'timestamp' | 'hour' | 'until' | 'day';

@Pipe({
	name: 'blcDate'
})
export class BlcDatePipe implements PipeTransform {
	constructor(private dateService: DateService) {

	}

	transform(date: Date, format?: DateFormat): string {
		if (format) {
			if (format === 'date') {
				return this.dateService.dateString(date);
			} else if (format === 'timestamp') {
				return this.dateService.timestampString(date);
			} else if (format === 'hour') {
				return this.dateService.hourString(date);
			} else if (format === 'until') {
				return this.dateService.untilString(date);
			} else if (format === 'day') {
				return this.dateService.dayString(date);
			}
		}

		return this.dateService.dateString(date);
	}

}
