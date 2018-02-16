import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ItemRoutingModule} from './item-routing.module';
import {ItemComponent} from "./item.component";
import { ItemSelectComponent } from './item-select/item-select.component';
import {BranchModule} from "../branch/branch.module";
import { ItemDisplayComponent } from './item-display/item-display.component';
import {CartModule} from "../cart/cart.module";

@NgModule({
	imports: [
		CommonModule,
		ItemRoutingModule,
		BranchModule,
		CartModule
	],
	declarations: [
		ItemComponent,
		ItemSelectComponent,
		ItemDisplayComponent
		
	]
})
export class ItemModule {
}
