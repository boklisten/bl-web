import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'app';

	constructor(private _router: Router, private route: ActivatedRoute) {
		_router.events.subscribe(() =>  {
			window.scroll(0, 0);
		});
	}
}
