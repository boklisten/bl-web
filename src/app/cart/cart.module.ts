import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartRoutingModule} from './cart-routing.module';
import {CartComponent} from "./cart.component";
import {CartService} from "./cart.service";
import { CartItemComponent } from './cart-item/cart-item.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DateService} from "../date/date.service";
import {PriceService} from "../price/price.service";
import { CartItemTypeSelectComponent } from './cart-item-type-select/cart-item-type-select.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NgbModule,
		CartRoutingModule
	],
	declarations: [
		CartComponent,
		CartItemComponent,
		CartItemTypeSelectComponent
	],
	providers: [
		CartService,
		DateService,
		PriceService
	],
	exports: [
		CartItemTypeSelectComponent
	]
})
export class CartModule {
}
