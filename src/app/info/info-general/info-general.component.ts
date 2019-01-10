import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-info-general",
	templateUrl: "./info-general.component.html",
	styleUrls: ["./info-general.component.scss"]
})
export class InfoGeneralComponent implements OnInit {
	generalInfoTitle: string;
	generalInfoDesc: string;
	generalInfos: { title: string; textBlocks: string[] }[];

	constructor() {
		this.generalInfoTitle = "Velkommen til Boklisten.no";
		this.generalInfoDesc =
			"Velkommen til vår nye nettside! Her kan du låne og kjøpe bøker akkurat som på den gamle – bare mye enklere.";
		this.generalInfos = [
			{
				title: "Bytte- og returrett",
				textBlocks: [
					"Vi har 14 dagers bytte- og returrett. Dersom du ønsker å benytte deg av denne retten, er det enkleste å komme innom en av våre stands. Alle åpningstider finner du i fanen «Skoler og åpningstider»."
				]
			},
			{
				title: "Innkjøp av bøker",
				textBlocks: [
					"Boklisten har også innkjøp av bøker. Dersom du har bøker som er på vår innkjøpsliste, kan du selge disse til oss for 1/3 av nypris. Hvilke bøker vi kan kjøpe vil variere ut fra vårt behov."
				]
			},
			{
				title: "Innlevering og utlevering",
				textBlocks: [
					"Du vil finne alle åpningstider for inn- og utlevering under «Skoler og åpningstider» så fort de er offentliggjort."
				]
			}
		];
	}

	ngOnInit() {}
}
