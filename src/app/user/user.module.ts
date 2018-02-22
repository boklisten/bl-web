import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {UserRoutingModule} from "./user-routing.module";
import {UserService} from "./user.service";
import {BranchModule} from "../branch/branch.module";
import {UserComponent} from "./user.component";
import { OrderComponent } from './order/order.component';
import { OrderInfoComponent } from './order/order-info/order-info.component';

@NgModule({
	imports: [
		CommonModule,
		UserRoutingModule,
		BranchModule
	],
	declarations: [
		HomeComponent,
		UserComponent,
		OrderComponent,
		OrderInfoComponent
	],
	providers: [
		UserService
	]
})
export class UserModule {
}
