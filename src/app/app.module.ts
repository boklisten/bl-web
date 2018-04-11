import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeModule} from "./home/home.module";
import {LoginModule} from "@wizardcoder/bl-login";
import {WelcomeComponent} from './welcome/welcome.component';
import {InfoComponent} from './info/info.component';
import {UserComponent} from './user/user.component';
import {UserModule} from "./user/user.module";
import {BranchSelectComponent} from './branch/branch-select/branch-select.component';
import {FormsModule} from "@angular/forms";
import {BranchModule} from "./branch/branch.module";
import {ItemComponent} from './item/item.component';
import {ItemModule} from "./item/item.module";
import {CartComponent} from './cart/cart.component';
import {HeaderCartComponent} from './header/header-cart/header-cart.component';
import {FooterComponent} from './footer/footer.component';
import {InfoModule} from "./info/info.module";
import {NavigationComponent} from './navigation/navigation.component';
import {CartModule} from "./cart/cart.module";
import {BlConnectModule} from "@wizardcoder/bl-connect";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";

import {
	faList, faUser, faShoppingCart, faCartPlus, faCheck, faBook, faCopyright, faGraduationCap, faSignOutAlt,
	faClipboard, faCartArrowDown, faSquare, faCheckSquare, faSync
} from '@fortawesome/free-solid-svg-icons';
import {environment} from "../environments/environment";

library.add(faList, faUser, faShoppingCart, faCartPlus, faCheck, faBook, faCopyright,
	faGraduationCap, faSignOutAlt, faClipboard, faCartArrowDown, faSquare, faCheckSquare, faSync);

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		WelcomeComponent,
		HeaderCartComponent,
		FooterComponent,
		NavigationComponent
	],
	imports: [
		BrowserModule,
		BlConnectModule,
		HomeModule,
		AppRoutingModule,
		LoginModule,
		UserModule,
		BranchModule,
		FormsModule,
		CartModule,
		ItemModule,
		InfoModule,
		FontAwesomeModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor() {
		BlConnectModule.withConfig({basePath: environment.apiPath});
		LoginModule.withConfig({successPath: 'u/home'});
	}
}
