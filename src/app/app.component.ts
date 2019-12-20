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
	public showAlert: boolean = false;

	constructor(private _router: Router, private route: ActivatedRoute) {}

	ngOnInit() {
		this.checkToShowGutter();
		this.checkShowAlert();

		this._router.events.subscribe(() => {
			this.checkToShowGutter();
			this.checkShowAlert();
			window.scroll(0, 0);
		});
	}

	private checkToShowGutter() {
		if (
			this.route &&
			this.route.snapshot &&
			this.route.snapshot.firstChild
		) {
			this.showGutter =
				this.route.snapshot.firstChild.url[0].path !== "welcome";
		}
	}

	private checkShowAlert() {
		if (
			this.route &&
			this.route.snapshot &&
			this.route.snapshot.firstChild
		) {
			const path: string = this.route.snapshot.firstChild.url[0].path;
			this.showAlert = !(
				path === "cart" ||
				path === "u" ||
				path === "i" ||
				path === "fastbuy"
			);
		}
	}
}
