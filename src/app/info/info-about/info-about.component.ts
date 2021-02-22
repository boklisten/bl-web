import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-info-about",
	templateUrl: "./info-about.component.html",
	styleUrls: ["./info-about.component.scss"],
})
export class InfoAboutComponent implements OnInit {
	aboutUsTitle: string;
	aboutUsDesc: string;
	aboutUsTexts: { title: string; textBlocks: string[] }[];
	aboutUsList: { title: string; listItems: string[] };

	constructor() {
		this.aboutUsTitle = "Om Boklisten.no";
		this.aboutUsDesc = '"Boklisten.no - alt innen skolebøker!"';

		this.aboutUsTexts = [
			{
				title: "",
				textBlocks: [
					"Boklisten.no (tidligere Søraas Bok) startet i 1990 med kjøp og salg av bøker til elever i videregående skole i Oslo og Akershus. Vi var involvert i utlånsordningen for skolebøker i 2000-01. Vi administrerer også dagens utlånsordning for private og offentlige skoler i Oslo og har gode referanser herfra. Vi har bygget opp en betydelig kompetanse og erfaring, og anser oss som ledende innenfor salg og formidling av brukte skolebøker for videregående skoler.",
					"I skoleboksesongen har vi 20-30 ansatte som har lang erfaring med behandling av store mengder bøker på kort tid.",
				],
			},
		];

		this.aboutUsList = {
			title: "Vi tilbyr",
			listItems: [
				"Administrasjon av utlånsordning for skolebøker til videregående skoler",
				"Salg av brukte og nye bøker til videregående skoler",
				"Henting av av bøker som skal resirkuleres på skoler",
			],
		};
	}

	ngOnInit() {}
}
