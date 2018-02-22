import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ItemRoutingModule} from './item-routing.module';
import {ItemComponent} from "./item.component";
import { ItemSelectComponent } from './item-select/item-select.component';
import {BranchModule} from "../branch/branch.module";
import { ItemDisplayComponent } from './item-display/item-display.component';
import {CartModule} from "../cart/cart.module";
import { ItemInfoComponent } from './item-info/item-info.component';
import { ItemAddComponent } from './item-add/item-add.component';

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
		ItemDisplayComponent,
		ItemInfoComponent,
		ItemAddComponent
		
	]
})
export class ItemModule {
}
