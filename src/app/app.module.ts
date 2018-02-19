import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeModule} from "./home/home.module";
import {LoginModule} from "bl-login";
import { WelcomeComponent } from './welcome/welcome.component';
import { InfoComponent } from './info/info.component';
import { UserComponent } from './user/user.component';
import {UserModule} from "./user/user.module";
import { BranchSelectComponent } from './branch/branch-select/branch-select.component';
import {FormsModule} from "@angular/forms";
import {BranchModule} from "./branch/branch.module";
import { ItemComponent } from './item/item.component';
import {ItemModule} from "./item/item.module";
import { CartComponent } from './cart/cart.component';
import { HeaderCartComponent } from './header/header-cart/header-cart.component';


@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		WelcomeComponent,
		InfoComponent,
		HeaderCartComponent
	],
	imports: [
		BrowserModule,
		HomeModule,
		AppRoutingModule,
		LoginModule,
		UserModule,
		BranchModule,
		FormsModule,
		ItemModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
