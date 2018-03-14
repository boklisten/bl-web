import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartRoutingModule} from './cart-routing.module';
import {CartComponent} from "./cart.component";
import {CartService} from "./cart.service";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DateService} from "../date/date.service";
import {PriceService} from "../price/price.service";
import {ItemModule} from "../item/item.module";
import { CartPaymentComponent } from './cart-payment/cart-payment.component';
import {CartPaymentService} from "./cart-payment/cart-payment.service";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NgbModule,
		CartRoutingModule,
		ItemModule
	],
	declarations: [
		CartComponent,
		CartPaymentComponent
	],
	providers: [
		CartService,
		DateService,
		PriceService,
		CartPaymentService
	]
})
export class CartModule {
}
