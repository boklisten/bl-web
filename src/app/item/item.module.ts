import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ItemRoutingModule} from './item-routing.module';
import {ItemComponent} from "./item.component";
import { ItemSelectComponent } from './item-select/item-select.component';
import {BranchModule} from "../branch/branch.module";
import { ItemDisplayComponent } from './item-display/item-display.component';
import { ItemInfoComponent } from './item-info/item-info.component';
import { ItemAddComponent } from './item-add/item-add.component';
import {ItemTypeSelectComponent} from "./item-type-select/item-type-select.component";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ItemDisplayCategoryComponent } from './item-display-category/item-display-category.component';
import {CartModule} from "../cart/cart.module";
import {CartGoToBarComponent} from "./cart-go-to-bar/cart-go-to-bar.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ItemRoutingModule,
		NgbModule,
		BranchModule
	],
	declarations: [
		ItemComponent,
		ItemSelectComponent,
		ItemDisplayComponent,
		ItemInfoComponent,
		ItemAddComponent,
		ItemTypeSelectComponent,
		ItemDisplayCategoryComponent,
		CartGoToBarComponent
	],
	exports: [
		ItemDisplayComponent,
		CartGoToBarComponent
	]
})
export class ItemModule {
}
