import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-info-for-pupils',
	templateUrl: './info-for-pupils.component.html',
	styleUrls: ['./info-for-pupils.component.scss']
})
export class InfoForPupilsComponent implements OnInit {
	forPupilsTitle: string;
	forPupilsDesc: string;
	forPupilsList: {title: string, listItems: string[]};
	forPupilsTexts: {title: string, textBlocks: string[]}[];

	constructor() {
		this.forPupilsTitle = 'Videregåendeelever';
		this.forPupilsDesc = 'Dersom du går på Wang eller Otto Treider og trenger bøker utenom hovedutdelingsdagene, ta kontakt med våre kontaktelever';
		this.forPupilsTexts = [
			{
				title: 'Wang',
				textBlocks: [
					'Siri B. Sandnes – 45515461 – siri.b.sandnes@gmail.com',
					'Victoria Heggelund – 46546406 – vicheg1@gmail.com'
				]
			},
			{
				title: 'Otto Treider',
				textBlocks: [
					'Ida Christine Lysne – 95032816 – lysneidachristine@gmail.com',
					'Camilla Hansen Andersen – 47950219 - camillahansenandersen@yahoo.no'
				]
			},
			{
				title: 'Utdeling',
				textBlocks: [
					'Spesifiserte tidsplaner for hver klasse på utdelingsdagene vil du kunne finne her når de er offentliggjort'
				]
			},
			{
				title: 'Wang',
				textBlocks: []
			},
			{
				title: 'Otto Treider',
				textBlocks: []
			}
		];


	}

	ngOnInit() {
	}

}
