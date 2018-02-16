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


@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		WelcomeComponent,
		InfoComponent,
		UserComponent
	],
	imports: [
		BrowserModule,
		HomeModule,
		AppRoutingModule,
		LoginModule,
		UserModule,
		BranchModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
