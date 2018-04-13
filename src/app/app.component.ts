import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'app';
	
	constructor(private _router: Router) {
		_router.events.subscribe(() =>  {
			window.scroll(0, 0);
		});
	}
}
