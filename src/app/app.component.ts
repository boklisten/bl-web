import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {
	title = "app";
	public showGutter: boolean = true;

	constructor(private _router: Router, private route: ActivatedRoute) {}

	ngOnInit() {
		this.checkToShowGutter();

		this._router.events.subscribe(() => {
			this.checkToShowGutter();
			window.scroll(0, 0);
		});
	}

	private checkToShowGutter() {
		if (this.route.snapshot.firstChild) {
			this.showGutter =
				this.route.snapshot.firstChild.url[0].path !== "welcome";
		}
	}
}
