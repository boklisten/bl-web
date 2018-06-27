import {Component, OnInit} from '@angular/core';
import {DateService} from "../date/date.service";

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	constructor(private _dateService: DateService) {
	}

	ngOnInit() {
	}

	getCurrentYear(): string {
		return this._dateService.getCurrentYear();
	}

	goToDibs() {
		window.open('https://www.dibs.no', '_blank');
	}

}

