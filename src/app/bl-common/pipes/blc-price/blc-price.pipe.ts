import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'blcPrice'
})
export class BlcPricePipe implements PipeTransform {

	transform(price: string, identifier?: 'international'): string {
		if (!identifier) {
			return parseFloat(price) + ' kr';
		} else if (identifier === 'international') {
			return parseFloat(price) + ' NOK';
		}
	}

}
