import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeModule} from "./home/home.module";
import {LoginModule} from "bl-login";
import { WelcomeComponent } from './welcome/welcome.component';
import { InfoComponent } from './info/info.component';


@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		WelcomeComponent,
		InfoComponent
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
