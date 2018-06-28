import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {UserRoutingModule} from "./user-routing.module";
import {UserService} from "./user.service";
import {BranchModule} from "../branch/branch.module";
import {UserComponent} from "./user.component";
import { OrderComponent } from './order/order.component';
import { OrderInfoComponent } from './order/order-info/order-info.component';
import { UserItemComponent } from './user-item/user-item.component';
import { UserCustomerItemComponent } from './user-customer-item/user-customer-item.component';
import {ItemModule} from "../item/item.module";
import {OrderItemInfoComponent} from "./order/order-info/order-item-info/order-item-info.component";
import {UserGuardService} from "./user-guard.service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { OrderPaymentInfoComponent } from './order/order-info/order-payment-info/order-payment-info.component';
import {BlCommonModule} from "../bl-common/bl-common.module";
import { OrderDeliveryInfoComponent } from './order/order-info/order-delivery-info/order-delivery-info.component';
import {UserCustomerItemService} from "./user-customer-item/user-customer-item.service";
import {UserEditComponent} from "./user-edit/user-edit.component";
import {LoginModule} from "@wizardcoder/bl-login";
import {UserEditService} from "./user-edit/user-edit.service";
import {UserOrderService} from "./order/user-order/user-order.service";
import { UserMenuComponent } from './user-menu/user-menu.component';

@NgModule({
	imports: [
		CommonModule,
		UserRoutingModule,
		BranchModule,
		ItemModule,
		FontAwesomeModule,
		BlCommonModule,
		LoginModule
	],
	declarations: [
		HomeComponent,
		UserComponent,
		OrderComponent,
		OrderInfoComponent,
		OrderItemInfoComponent,
		UserItemComponent,
		UserCustomerItemComponent,
		OrderPaymentInfoComponent,
		OrderDeliveryInfoComponent,
		UserEditComponent,
		UserMenuComponent
	],
	providers: [
		UserService,
		UserGuardService,
		UserCustomerItemService,
		UserEditService,
		UserOrderService
	],
	exports: [
		UserMenuComponent
	]
})
export class UserModule {
}
