import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BlcPricePipe } from "./pipes/blc-price/blc-price.pipe";
import { BlcDatePipe } from "./pipes/blc-date/blc-date.pipe";
import { BlcBranchPipe } from "./pipes/blc-branch/blc-branch.pipe";
import { BlcItemPricePipe } from "./pipes/blc-item-price/blc-item-price.pipe";
import { BlcCustomerItemPricePipe } from "./pipes/blc-customer-item-price/blc-customer-item-price.pipe";
import { BlcCustomerItemDatePipe } from "./pipes/blc-customer-item-date/blc-customer-item-date.pipe";
import { BlcSpinnerComponent } from "./components/blc-spinner/blc-spinner.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
	imports: [CommonModule, FontAwesomeModule],
	declarations: [
		BlcPricePipe,
		BlcDatePipe,
		BlcBranchPipe,
		BlcItemPricePipe,
		BlcCustomerItemPricePipe,
		BlcCustomerItemDatePipe,
		BlcSpinnerComponent
	],
	exports: [
		BlcPricePipe,
		BlcDatePipe,
		BlcBranchPipe,
		BlcItemPricePipe,
		BlcCustomerItemPricePipe,
		BlcCustomerItemDatePipe,
		BlcSpinnerComponent
	]
})
export class BlCommonModule {}
