import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StorageService } from "@boklisten/bl-connect";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {
	title = "app";
	public showGutter: boolean = true;
	public showAlert: boolean = false;
	public showCookieInfo: boolean = true;
	private cookiesAccepted: boolean;

	constructor(
		private _router: Router,
		private route: ActivatedRoute,
		private storageService: StorageService
	) {}

	ngOnInit() {
		this.checkToShowGutter();
		this.checkShowAlert();
		this.checkIfAcceptedCookies();

		this._router.events.subscribe(() => {
			this.checkToShowGutter();
			this.checkShowAlert();
			this.checkShowAcceptCookies();
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

	public acceptCookies() {
		this.storageService.add("bl-accept-cookies", JSON.stringify(true));
		this.checkIfAcceptedCookies();
		this.checkShowAcceptCookies();
	}

	private checkShowAcceptCookies() {
		if (
			this.route &&
			this.route.snapshot &&
			this.route.snapshot.firstChild
		) {
			const path: string = this.route.snapshot.firstChild.url[0].path;
			this.showCookieInfo =
				!(path === "i" || path === "fastbuy" || path === "cart") &&
				!this.cookiesAccepted;
		}
	}

	private checkIfAcceptedCookies() {
		try {
			const cookiesAcceptet = this.storageService.get(
				"bl-accept-cookies"
			);
			this.cookiesAccepted = true;
		} catch (e) {
			this.cookiesAccepted = false;
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
