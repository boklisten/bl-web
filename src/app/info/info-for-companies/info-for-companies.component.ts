import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-info-for-companies',
	templateUrl: './info-for-companies.component.html',
	styleUrls: ['./info-for-companies.component.scss']
})
export class InfoForCompaniesComponent implements OnInit {
	forCompaniesTitle: string;
	forCompaniesDesc: string;
	forCompaniesTexts: {title: string, textBlocks: string[]}[];
	forCompaniesList: {title: string, listItems: string[]};

	constructor() {
		this.forCompaniesTitle = 'For skolekunder';
		this.forCompaniesDesc = '';
		this.forCompaniesList = {
			title: 'Boklisten.no har flere tilbud til skoler',
			listItems: [
				'Salg av nye og brukte bøker - se liste nedenfor over brukte bøker vi har tilgjengelige',
				'Henting av utgåtte bøker (kun på Østlandet) - ta kontakt med oss på e-post eller telefon for å avtale henting!',
				'Utlån av bøker - vi kan administrere skolens utlån av bøker. Vi gjør det billig og effektivt med minimal belastning for skolen.'
			]
		};

		this.forCompaniesTexts = [
			{
				title: 'Mer om utlånsordning',
				textBlocks: [
					'Utlånsordningen for bøker i videregående skole har vært en stor belastning for mange skolebiblioteker. Boklisten.no kan administrere ordningen på en måte som sparer skolen for tid og penger.',
					'For tiden har vi avtale med flere skoler og har kapasitet til ytterligere. Vi har et svært effektivt nettbasert bestillings- og administrasjonssystem som gjør at vi kan tilby svært gunstige vilkår.',
					'Det eneste våre skolekunder må gjøre er å gi oss bokliste og oversikt over antall elever og vi ordner resten.',
					'Vi kommer på skolen flere ganger ved skolestart og skoleslutt for å levere ut og samle inn bøker og ansetter kontaktelever for å bidra med bytter underveis i skoleåret.',
					'Vi garanterer at det avtalte antallet bøker er tilgjengelig for skolens elever i avtaleperioden, sørger for kvalitetskontroll av innleverte bøker og erstatter tapte bøker.',
					'Hvis dette er av interesse kan Boklisten.no kontaktes på telefon 906 52 904 (Arne Søraas). \n' +
					'E-post: info@boklisten.no.',
				]
			},
			{
				title: 'Salg av brukte bøker fra vårt skyvearkiv',
				textBlocks: [
					'Vi fyller fortløpende opp med utgåtte lærebøker fra skoler i Østlandsområdet, og kan tilby salg av disse bøkene til en rimelig pris. Frakt er gratis. Under finnes en liste over tilgjengelig bøker til salgs. Listen kan endre seg kjapt, så ikke nøl med å sende en forespørsel på mail dersom dere trenger en bok som ikke er på listen. Bestillinger kan sendes til vår e-postadresse info@boklisten.no – vi kan tilby både papirfaktura og EHF.'
				]
			}
		];

	}

	ngOnInit() {
	}

}
