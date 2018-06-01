import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlcPricePipe} from './pipes/blc-price.pipe';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [BlcPricePipe],
	exports: [
		BlcPricePipe
	]
})
export class BlCommonModule {
}
