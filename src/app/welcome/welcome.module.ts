import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WelcomeRoutingModule } from "./welcome-routing.module";
import { WelcomeComponent } from "./welcome.component";
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import { FastbuyModule } from "../fastbuy/fastbuy.module";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NewsBannerModule } from "./news-banner/news-banner.module";

@NgModule({
	imports: [
		CommonModule,
		WelcomeRoutingModule,
		NgbCarouselModule,
		FastbuyModule,
		NewsBannerModule,

		FontAwesomeModule,
	],
	declarations: [WelcomeComponent],
})
export class WelcomeModule {}
