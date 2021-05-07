import { Injectable } from "@angular/core";

declare let gtag: Function;

@Injectable({
	providedIn: "root",
})
export class GoogleAnalyticsService {
	constructor() {}
	public eventEmitter(
		eventName: string,
		eventAction: string,
		eventCategory?: string,
		eventLabel?: string,
		eventValue?: number
	) {
		gtag("event", eventName, {
			eventCategory: eventCategory,
			eventLabel: eventLabel,
			eventAction: eventAction,
			eventValue: eventValue,
		});
	}
}
