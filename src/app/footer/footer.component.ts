import { Component, OnInit } from "@angular/core";
import { DateService } from "../date/date.service";
import { environment } from "../../environments/environment";

@Component({
	selector: "app-footer",
	templateUrl: "./footer.component.html",
	styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
	public blwebVersion: string;
	public blwebVersionName: string;
	public isDevEnvironment: boolean;

	constructor(private _dateService: DateService) {
		this.blwebVersion = environment.version;
		this.blwebVersionName = environment.versionName;
		this.isDevEnvironment = !environment.production;
	}

	ngOnInit() {}

	getCurrentYear(): string {
		return this._dateService.getCurrentYear();
	}

	goToDibs() {
		window.open("https://www.dibs.no", "_blank");
	}
}
