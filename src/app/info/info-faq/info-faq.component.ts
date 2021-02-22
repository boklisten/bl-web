import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-info-faq",
	templateUrl: "./info-faq.component.html",
	styleUrls: ["./info-faq.component.scss"],
})
export class InfoFaqComponent implements OnInit {
	faqs: { title: string; textBlocks: string[] }[];

	constructor() {
		this.faqs = [
			{
				title: "Hva betyr det at Boklisten alltid leverer riktig bok?",
				textBlocks: [
					"Vi i Boklisten garanterer at du får den boken du trenger til din undervisning av oss. Det vil si at det er den boken som står på din skoles bokliste.  Vi har åpent kjøp i 14 dager og du kan bytte boken eller få pengene tilbake i denne perioden.",
				],
			},
			{
				title: "Hvordan bestiller jeg bøker som privatist?",
				textBlocks: [
					"Du bruker nettbutikken som en vanlig nettbutikk. Når du har betalt – enten på forhånd eller på stand - vil bøkene leveres ut på din skole eller per post. Vi har alle bøkene til skolen din tilgjengelig på stand, men noen ganger må vi etterbestille. Da kan det ta opp til ca 1 uke før bøkene er klare. Du må ta med legitimasjon når du skal hente bøkene. Du kan velge å delbetale for både et halvt og et helt år.",
				],
			},
			{
				title: "Kan jeg kjøpe bøker fra Boklisten.no?",
				textBlocks: [
					"Ja. Elever og privatister som melder seg inn i vår kundeklubb kan kjøpe bøker på våre nettsider med oppdelt betaling. Det vil si at du betaler litt over halvparten av boken ved bestilling og resten om ca 6 eller 12 måneder. Du betaler andre del på nett eller på en av våre stands.",
				],
			},
			{
				title: "Hvordan bestiller jeg bøker som elev på videregående?",
				textBlocks: [
					"Du bruker nettbutikken som en vanlig nettbutikk. Når du har fullført din bestilling vil du få en kontrakt på e-post. Denne må underskrives av deg, og en av dine foresatte dersom du er under 18 år. Ta med underskrevet kontrakt når du kommer på skolen på utleveringsdagen. Du må ta med legitimasjon når du skal hente bøkene. Bøkene blir utlevert til deg, og du leverer dem inn igjen til Boklisten.no eller den Boklisten.no har oppnevnt når skoleåret er over.",
					"Du skal ikke betale for bøkene når du får dem, bare dersom du mister eller ødelegger bøkene.",
				],
			},
			{
				title: "MÅ jeg bestille bøker?",
				textBlocks: [
					"Nei, men hvis du bestiller sørger vi for at du får bøkene raskest mulig. Ved kø vil vi også prioritere de som har bestilt og betalt for bøkene allerede. Vi garanterer at vi har bøkene klare 1 uke etter at du har bestilt.",
				],
			},
			{
				title:
					"Hva betyr det at dere garanterer at bøkene er klare 1 uke etter at jeg har bestilt?",
				textBlocks: [
					"Det betyr at vi gjør vårt ytterste for at du skal få bøkene dine innen da. Oftest vil vi ha bøker tilgjengelig tidligere.",
				],
			},
			{
				title: "Sender dere bøker i posten?",
				textBlocks: [
					"Elever som går på nettstudier kan få tilsendt bøker i posten gratis. Også elever som ikke går nettstudier kan nå få tilsendt bøker i posten – mot fraktkostnader. Det er bare å velge post som leveringsmetode når du bestiller.",
				],
			},
			{
				title: "Når kommer åpningstidene?",
				textBlocks: [
					"Alle åpningstider blir lagt på nettsiden så snart de er klare. Sjekk innom nettsiden et par uker før skolestart, så vil de fleste åpningstidene være på plass.",
				],
			},
			{
				title: "Hvordan fungerer innlevering av bøker for elever?",
				textBlocks: [
					"Innlevering av bøker vil skje på bestemte dager på hver skole. Bøker som ikke leveres inn disse dagene kan sendes til oss i posten. Husk at det er dyrt å sende bøker i posten - derfor anbefales det på det sterkeste å komme innom på stand!",
					"Fristen for å levere bøker til Boklisten.no er 1. juli i vårsemesteret og 20. desember i høstsemesteret. Etter dette sender vi faktura for å erstatte bøker i henhold til låneavtalen.",
					"Hvis du sender bøker i posten, må du huske å legge ved et ark med informasjon om deg: Navn og telefonnummer er et minimum. Legg også ved en liste over hvilke bøker det er du leverer. Dersom det ikke er mulig å identifisere avsender av en pakke, kan vi heller ikke registrere innleveringen - og vil sende ut erstatningsfaktura på vanlig måte.",
					"Dersom du skal sende bøker, anbefales det på det sterkeste å sende en pakke med sporing eller kollinummer. Da kan både du som kunde og vi sjekke hvor pakken er, og hva som eventuelt har skjedd med den dersom den mot formodning ikke har kommet frem.",
					"Adresse for innsending av bøker (vi godtar ingen bøker som er sendt etter fristen):",
					"Boklisten.no AS, Postboks 8, 1316 Eiksmarka",
				],
			},
			{
				title: "Hvor skal jeg levere tilbake bøkene som elev?",
				textBlocks: [
					"Vi kommer til skolen for å samle inn bøker. Du vil også ha andre muligheter til å levere og du kan sende bøkene i posten til oss. Informasjon om levering kommer på våre nettsider ca 1 måned før innleveringsfristen som er 1. juli for vårsemester og 20. desember for høstsemester.",
				],
			},
			{
				title: "Kan noen andre levere bøkene for meg?",
				textBlocks: [
					"Ja - du kan få noen andre til å levere bøkene for deg. Legg imidlertid merke til at vi kun får registrert innleveringen dersom den som leverer kan oppgi ditt navn og/eller telefonnummer - slik at vi får registrert boken på riktig person. Vi tar ikke ansvar for bøker som har blitt levert uten identifikasjon.",
				],
			},
			{
				title: "Kan jeg beholde bøkene?",
				textBlocks: [
					"Privatister: Boken er din så snart andre delbetaling er gjort. Hvis du ikke ønsker å beholde boken kjøper vi inn de fleste bøker for rundt 1/3 av nypris på våre stands på slutten av semesteret.",
					"Elever: Ja, men hvis du ikke leverer bøkene innen fristen vil du få erstatningsfaktura fra oss. Denne er på bokens nypris + 10% + 90 kroner i gebyr. Dette er dyrt og anbefales ikke! Utkjøp koster 100% av nypris for videregående-elever. For å unngå erstatningsfaktura, må utkjøpet gjøres innen innleveringsfristens utløp – som er 1.juli for vårsemester og 20.desember for høstsemester.",
				],
			},
			{
				title: "Hvor mye koster bøkene?",
				textBlocks: [
					"Du kan finne alle våre priser ved å sjekke boklistene for hver skole. Prisene er lavere for medlemmer av vår kundeklubb og du får da også delt opp betalingen. De tilsvarer forlagenes listepris/nypris.",
				],
			},
			{
				title: "Hvordan betaler jeg?",
				textBlocks: [
					"I nettbutikken kan du bare betale med kort. Hvis du velger å betale på stand, kan du betale med både kort, kontant og Vipps.",
				],
			},
			{
				title: "Reklamasjon og angrerett",
				textBlocks: [
					"Vi følger vanlige regler for reklamasjon. Det vil si at du kan levere tilbake boken innen 14 dager fra du fikk boken utlevert og få tilbake pengene. Boken må være i samme stand som når du fikk den. Dette gjelder uansett om du kjøper boken på nett eller på skolen når vi er der.",
				],
			},
			{
				title: "Hva er en ødelagt bok?",
				textBlocks: [
					"Det er en bok som etter vår vurdering ikke lenger kan brukes av en elev. Et eksempel er en bok med sterk lukt, våte/krøllete sider, misfarging eller manglende for- eller bakside. Vi deler aldri ut en bok uten forside eller bakside. Hvis du ødelegger en bok må du erstatte denne. Da anbefales det å kjøpe ut før fristen, ettersom det er billigere enn erstatningsfaktura.",
				],
			},
			{
				title: "Kan jeg streke i bøkene?",
				textBlocks: [
					"Ja, men husk at boken skal brukes av noen etter deg. Hvis du har streket så mye at den er ubrukelig må du erstatte boken. Bruk blyant hvis du streker svært mye i bøkene!",
					"Vi kjøper inn bøker fra privatister selv om de er streket i.",
				],
			},
			{
				title: "Må jeg sette bind på bøkene som jeg låner?",
				textBlocks: [
					"Nei, men vi foretrekker at du gjør det og det er mindre sjanse for at boken blir ødelagt hvis du har satt på bind. Det er derfor en forsikring for deg selv.",
				],
			},
			{
				title:
					"Hva skal jeg gjøre hvis jeg ikke er fornøyd med boken jeg fikk?",
				textBlocks: [
					"Hvis du likevel ikke vil ha en bok kan du levere tilbake denne. Se reklamasjon og angrerett. Hvis du vil bytte en bok ordner vi det oftest ved at du leverer inn en bok og får tilbake en annen. Hvis du har fått en brukt bok som du ikke er fornøyd med bytter vi alltid uten spørsmål - vi vil at du skal lykkes og da må du ha en god bok!",
				],
			},
			{
				title:
					"Hvordan får jeg bøkene mine når jeg er elev på en videregående skole?",
				textBlocks: [
					"Du kommer med en underskrevet kontrakt og identifikasjon til skolen din på utleveringsdagen - der får du utlevert bøker.",
				],
			},
			{
				title:
					"Hva gjør jeg om jeg gikk glipp av utdeling av bøker på videregående skole?",
				textBlocks: [
					"Ta kontakt med kontaktelevene på din skole. Kontaktinformasjon til kontaktelevene kan du finne på informasjonssidene våre.",
				],
			},
			{
				title: "Andre spørsmål?",
				textBlocks: [
					"Har du andre spørsmål? Send oss en mail! Vi svarer vanligvis i løpet av én dag.",
				],
			},
		];
	}

	ngOnInit() {}
}
