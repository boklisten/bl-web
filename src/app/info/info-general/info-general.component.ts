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
			"Velkommen til vår nye nettside! Her kan du leie bøker akkurat som på den gamle – bare mye enklere.";
		this.generalInfos = [
			{
				title: "Har du leid bøker med den gamle nettsiden?",
				textBlocks: [
					"Innsamling foregår på vanlig måte som for alle andre – husk bare å nevne for de ansatte at du har bruker i gammelt system, slik at de kan finne bøkene dine der."
				]
			},
			/*
			{
				title: 'Spesielt for Akademiet Drammen',
				textBlocks: [
					'På Akademiet Drammen vil du kunne leie bøker utenfor våre faste åpningstider. Ta kontakt med vår kontaktperson i Drammen for å gjøre dette:',
					'Sofia Bjurulf - 47684681 - s.bjurulf@altiboxmail.no'
				]
      },
       */
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
