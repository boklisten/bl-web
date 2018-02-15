import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeModule} from "./home/home.module";
import {LoginModule} from "bl-login";
import { AuthComponent } from './auth/auth.component';


@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		AuthComponent
	],
	imports: [
		BrowserModule,
		HomeModule,
		AppRoutingModule,
		LoginModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
