import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-welcome-slider',
	templateUrl: './welcome-slider.component.html',
	styleUrls: ['./welcome-slider.component.scss']
})
export class WelcomeSliderComponent implements OnInit, AfterViewInit {
	public imageWidth: number;
	public imageHeight: number;

	constructor() {
	}

	ngOnInit() {
		setTimeout(() => {
			const welcomeSliderComp = document.getElementById('welcomeSlider');


			this.imageWidth = welcomeSliderComp.offsetWidth;
			this.imageHeight = welcomeSliderComp.offsetHeight;
		}, 0);
	}

	ngAfterViewInit() {
	}



}
