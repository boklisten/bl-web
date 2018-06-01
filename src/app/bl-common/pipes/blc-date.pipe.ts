import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'blcDate'
})
export class BlcDatePipe implements PipeTransform {

	transform(date: Date, args?: any): string {
		return date.toLocaleDateString();
	}

}
