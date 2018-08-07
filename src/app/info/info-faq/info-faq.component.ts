import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-info-faq',
	templateUrl: './info-faq.component.html',
	styleUrls: ['./info-faq.component.scss']
})
export class InfoFaqComponent implements OnInit {

	faqs: {title: string, textBlocks: string[]}[];

	constructor() {
		this.faqs = [
			{
				title: 'Hvordan leier jeg bøker som privatist?',
				textBlocks: [
					'Du har tre muligheter. Du kan registrere deg på nettsiden for å forhåndsbestille bøker, og velge mellom betaling via DIBS eller betaling når du kommer på stand. Du kan også komme direkte på stand på skolen din for å leie. Du må imidlertid uansett registrere deg for å leie, så det kan være lurt å gjøre det allerede nå!'
				]
			},
			{
				title: 'Hvordan bestiller jeg bøker som privatist?',
				textBlocks: [
					'Du bruker nettbutikken som en vanlig nettbutikk. Når du har betalt – enten på forhånd eller på stand - vil bøkene leveres ut på din skole. Vi har alle bøkene til skolen din tilgjengelig på stand, men noen ganger må vi etterbestille. Da kan det ta opp til ca 1 uke før bøkene er klare. Du må ta med legitimasjon når du skal hente bøkene. Husk at når du bestiller på nett betaler du for å leie bøkene! Du kan leie for både et halvt og et helt år. Noen bøker kan også kjøpes på nettsiden vår.'
				]
			},
			{
				title: 'Kan jeg kjøpe bøker fra Boklisten.no?',
				textBlocks: [
					'Ja, men da må du som regel møte opp på skolen din. Du finner tidspunkter på våre nettsider. Vi selger i utgangspunktet kun nye bøker. Ta kontakt med våre ansatte på stand dersom du ønsker å kjøpe bøker som kun står til utleie på nettsiden. Noen bøker selger vi også på nettsiden. Disse er spesielt merket i boklistene.'
				]
			},
			{
				title: 'Hvordan bestiller jeg bøker som elev på videregående?',
				textBlocks: [
					'Du bruker nettbutikken som en vanlig nettbutikk. Når du har fullført din bestilling vil du få en kontrakt på e-post. Denne må underskrives av deg, og en av dine foresatte dersom du er under 18 år. Ta med underskrevet kontrakt når du kommer på skolen på utleveringsdagen. Du må ta med legitimasjon når du skal hente bøkene. Bøkene blir utlevert til deg, og du leverer dem inn igjen til Boklisten.no eller den Boklisten.no har oppnevnt når skoleåret er over.'
				]
			},
			{
				title: 'MÅ jeg bestille bøker?',
				textBlocks: [
					'Nei, men hvis du bestiller sørger vi for at du får bøkene raskest mulig. Ved kø vil vi også prioritere de som har bestilt og betalt for bøkene allerede. Vi garanterer at vi har bøkene klare 1 uke etter at du har bestilt.'
				]
			},
			{
				title: 'Hva betyr det at dere garanterer at bøkene er klare 1 uke etter at jeg har bestilt?',
				textBlocks: [
					'Det betyr at vi gjør vårt ytterste for at du skal få bøkene dine innen da. Oftest vil vi ha bøker tilgjengelig tidligere.'
				]
			},
			{
				title: 'Sender dere bøker i posten?',
				textBlocks: [
					'Elever som går på nettstudier kan få tilsendt bøker i posten gratis. Også elever som ikke går nettstudier kan nå få tilsendt bøker i posten – mot fraktkostnader. Det er bare å velge post som leveringsmetode når du bestiller.'
				]
			},
			{
				title: 'Når kommer åpningstidene?',
				textBlocks: [
					'Alle åpningstider blir lagt på nettsiden så snart de er klare. Sjekk innom nettsiden et par uker før skolestart, så vil de fleste åpningstidene være på plass.'
				]
			},
			{
				title: 'Hvordan fungerer innlevering?',
				textBlocks: [
					'Innlevering av bøker vil skje på bestemte dager på hver skole. Bøker som ikke leveres inn disse dagene kan sendes til oss i posten. Husk at det er dyrt å sende bøker i posten - derfor anbefales det på det sterkeste å komme innom på stand!',
					'Fristen for å levere bøker til Boklisten.no er 1.juli i vårsemesteret og 20.desember i høstsemesteret. Etter dette sender vi faktura for å erstatte bøker i henhold til leie-/låneavtalen.',
					'Hvis du sender bøker i posten, må du huske å legge ved et ark med informasjon om deg: Navn og telefonnummer er et minimum. Legg også ved en liste over hvilke bøker det er du leverer. Dersom det ikke er mulig å identifisere avsender av en pakke, kan vi heller ikke registrere innleveringen - og vil sende ut erstatningsfaktura på vanlig måte.',
					'Dersom du skal sende bøker, anbefales det på det sterkeste å sende en pakke med sporing eller kollinummer. Da kan både du som kunde og vi sjekke hvor pakken er, og hva som eventuelt har skjedd med den dersom den mot formodning ikke har kommet frem.',
					'Adresse for innsending av bøker (vi godtar ingen bøker som er sendt etter fristen)',
					'Boklisten.no AS, Postboks 8, 1316 Eiksmarka'
				]
			}
		];
	}

	ngOnInit() {
	}

}
