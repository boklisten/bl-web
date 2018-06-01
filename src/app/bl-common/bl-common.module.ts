import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlcPricePipe} from './pipes/blc-price.pipe';
import { BlcDatePipe } from './pipes/blc-date.pipe';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [BlcPricePipe, BlcDatePipe],
	exports: [
		BlcPricePipe,
		BlcDatePipe
	]
})
export class BlCommonModule {
}
