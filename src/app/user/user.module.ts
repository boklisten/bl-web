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

@NgModule({
	imports: [
		CommonModule,
		UserRoutingModule,
		BranchModule,
		ItemModule
	],
	declarations: [
		HomeComponent,
		UserComponent,
		OrderComponent,
		OrderInfoComponent,
		UserItemComponent,
		UserCustomerItemComponent
	],
	providers: [
		UserService
	]
})
export class UserModule {
}
