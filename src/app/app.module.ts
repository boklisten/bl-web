import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, ErrorHandler, NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoginModule } from "@boklisten/bl-login";
import { UserModule } from "./user/user.module";
import { FormsModule } from "@angular/forms";
import { BranchModule } from "./branch/branch.module";
import { ItemModule } from "./item/item.module";
import { HeaderCartComponent } from "./header/header-cart/header-cart.component";
import { FooterComponent } from "./footer/footer.component";
import { InfoModule } from "./info/info.module";
import { CartModule } from "./cart/cart.module";
import { FastbuyModule } from "./fastbuy/fastbuy.module";
import { BlConnectConfigService, BlConnectModule } from "@boklisten/bl-connect";
import {
	FontAwesomeModule,
	FaIconLibrary,
} from "@fortawesome/angular-fontawesome";
import { MatchModule } from "./match/match.module";
import { ClickOutsideModule } from "ng-click-outside";
import { BookingModule } from "./booking/booking.module";

import {
	faCircle,
	faUserFriends,
	faFilter,
	faExternalLinkAlt,
	faUser,
	faChevronRight,
	faFlagCheckered,
	faShoppingCart,
	faCartPlus,
	faCheck,
	faBook,
	faCopyright,
	faGraduationCap,
	faSignOutAlt,
	faClipboard,
	faCartArrowDown,
	faCheckSquare,
	faSync,
	faExclamationTriangle,
	faClock,
	faCheckCircle,
	faTimes,
	faCreditCard,
	faMoneyBillAlt,
	faCalendarPlus,
	faCalendar,
	faCalendarAlt,
	faReceipt,
	faList,
	faCircleNotch,
	faTruck,
	faWarehouse,
	faArrowAltCircleDown,
	faBookOpen,
	faMoneyBillWave,
	faInfoCircle,
	faUserCog,
	faUserCircle,
	faBars,
	faExclamationCircle,
	faCoffee,
	faHeart,
	faCaretDown,
	faAngleDoubleDown,
	faAngleDoubleUp,
	faBan,
	faArrowAltCircleUp,
	faArrowLeft,
	faStore,
	faArrowRight,
	faUserPlus,
	faSignInAlt,
	faChevronLeft,
	faAt,
	faKey,
	faPhone,
	faAddressCard,
	faBirthdayCake,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as farCircle } from "@fortawesome/free-regular-svg-icons";
import { environment } from "../environments/environment";
import { BranchGuardService } from "./branch/branch-guard-service/branch-guard.service";
import { WelcomeModule } from "./welcome/welcome.module";
import { HeaderUserDetailAlertComponent } from "./header-alert/header-user-detail-alert/header-user-detail-alert.component";
import { HeaderAlertModule } from "./header-alert/header-alert.module";
import { UserEditComponent } from "./user/user-edit/user-edit.component";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { faFacebookSquare, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons/faSquare";
import { LogoutComponent } from "./logout/logout.component";
import { Router } from "@angular/router";
import * as Sentry from "@sentry/angular";
import { GoogleAnalyticsService } from "./GoogleAnalytics/google-analytics.service";

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		HeaderCartComponent,
		FooterComponent,
		LogoutComponent,
	],
	imports: [
		BrowserModule,
		BlConnectModule,
		AppRoutingModule,
		LoginModule,
		UserModule,
		BranchModule,
		FormsModule,
		CartModule,
		ItemModule,
		InfoModule,
		FontAwesomeModule,
		WelcomeModule,
		HeaderAlertModule,
		NgbDropdownModule,
		FastbuyModule,
		MatchModule,
		ClickOutsideModule,
		BookingModule,
	],
	providers: [
		BranchGuardService,
		{
			provide: ErrorHandler,
			useValue: Sentry.createErrorHandler({
				showDialog: false,
			}),
		},
		{
			provide: Sentry.TraceService,
			deps: [Router],
		},
		{
			provide: APP_INITIALIZER,
			useFactory: () => () => {},
			deps: [Sentry.TraceService],
			multi: true,
		},
		GoogleAnalyticsService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor(
		private blConnectConfigService: BlConnectConfigService,
		library: FaIconLibrary
	) {
		library.addIcons(
			farCircle,
			faCircle,
			faFilter,
			faExternalLinkAlt,
			faChevronRight,
			faList,
			faUser,
			faShoppingCart,
			faCartPlus,
			faCheck,
			faBook,
			faCopyright,
			faStore,
			faGraduationCap,
			faSignOutAlt,
			faClipboard,
			faCartArrowDown,
			faSquare,
			faCheckSquare,
			faSync,
			faExclamationTriangle,
			faClock,
			faCheckCircle,
			faTimes,
			faCreditCard,
			faMoneyBillAlt,
			faCalendarPlus,
			faCalendar,
			faCalendarAlt,
			faReceipt,
			faCircleNotch,
			faTruck,
			faWarehouse,
			faArrowAltCircleDown,
			faBookOpen,
			faMoneyBillWave,
			faInfoCircle,
			faUserCog,
			faUserCircle,
			faBars,
			faExclamationCircle,
			faCoffee,
			faHeart,
			faCaretDown,
			faAngleDoubleDown,
			faAngleDoubleUp,
			faBan,
			faArrowAltCircleUp,
			faArrowRight,
			faUserPlus,
			faSignInAlt,
			faChevronLeft,
			faAt,
			faKey,
			faFacebookSquare,
			faGoogle,
			faPhone,
			faAddressCard,
			faBirthdayCake,
			faArrowLeft,
			faFlagCheckered,
			faUserFriends
		);
		blConnectConfigService.setConfig({ basePath: environment.apiPath });
		LoginModule.withConfig({
			successPath: "/i/select",
			apiPath: environment.apiPath,
			userAgreementUrl: "/info/agreement/rent",
			userDetailNotValidPath: "/u/edit",
			registerSuccessPath: "/u/edit",
			permissionDeniedPath: "",
			permissions: ["customer", "employee", "manager", "admin", "super"],
			logoutPath: "/logout",
			providers: {
				local: true,
				facebook: true,
				google: true,
				feide: false,
			},
		});
	}
}
