import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WelcomeRoutingModule } from "./welcome-routing.module";
import { WelcomeComponent } from "./welcome.component";
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import { FastbuyModule } from "../fastbuy/fastbuy.module";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
	imports: [
		CommonModule,
		WelcomeRoutingModule,
		NgbCarouselModule,
		FastbuyModule,

		FontAwesomeModule,
	],
	declarations: [WelcomeComponent],
})
export class WelcomeModule {}
