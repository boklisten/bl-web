import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WelcomeRoutingModule} from './welcome-routing.module';
import {WelcomeComponent} from "./welcome.component";
import {WelcomeSliderComponent} from "./welcome-slider/welcome-slider.component";
import {NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
	imports: [
		CommonModule,
		WelcomeRoutingModule,
		NgbCarouselModule
	],
	declarations: [
		WelcomeComponent,
		WelcomeSliderComponent
	]
})
export class WelcomeModule {
}
