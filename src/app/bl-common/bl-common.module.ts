import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlcPricePipe} from './pipes/blc-price/blc-price.pipe';
import { BlcDatePipe } from './pipes/blc-date/blc-date.pipe';
import { BlcBranchPipe } from './pipes/blc-branch/blc-branch.pipe';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [BlcPricePipe, BlcDatePipe, BlcBranchPipe],
	exports: [
		BlcPricePipe,
		BlcDatePipe,
		BlcBranchPipe
	]
})
export class BlCommonModule {
}
