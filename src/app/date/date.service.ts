import {Injectable} from '@angular/core';
import {Branch, CustomerItem, Item, OpeningHour} from "@wizardcoder/bl-model";
import * as moment from 'moment';
import {BranchStoreService} from "../branch/branch-store.service";

@Injectable()
export class DateService {

	constructor(private _branchStoreService: BranchStoreService) {
		moment.locale('nb');
	}

	public dateString(date): string {
		return moment(date).format('DD.MM.YYYY');
	}

	public dayString(date): string {
		return moment(date).format('dddd');
	}

	public timestampString(date: Date): string {
		return moment(date).format('DD.MM.YYYY') + ' kl. ' + moment(date).format('HH.mm.ss');
	}

	public hourString(date: Date): string {
		return 'kl ' + moment(date).format('HH.mm');
	}

	public untilString(date: Date): string {
		return this.daysUntil(date);
	}

	public isTodayAfter(date: Date) {
		return moment(date).isBefore(moment());
  }

  public isDateStillActive(date: Date) {
    return moment().isSameOrBefore(moment(date));
  }

  public sortOpeningHours(openingHours: OpeningHour[]): OpeningHour[] {

    const sortedOpeningHours: OpeningHour[] = openingHours.slice();
    sortedOpeningHours.sort(this.sortOpeningHour);
    return sortedOpeningHours;
  }

  private sortOpeningHour(a: OpeningHour, b: OpeningHour) {
    const aMoment = moment(a.from);
    const bMoment = moment(b.from);

    if (aMoment.isBefore(bMoment)) {
      return -1;
    } else if (aMoment.isAfter(bMoment)) {
      return 1;
    }

    return 0;
  }

	public getExtendDate(periodType: 'semester' | 'year'): Date {
		const branch = this._branchStoreService.getBranch();

		if (branch.paymentInfo.extendPeriods) {
			for (const extendPeriod of branch.paymentInfo.extendPeriods) {
				if (extendPeriod.type === periodType) {
					return extendPeriod.date;
				}
			}
		}
	}

	public getPeriodDate(periodType: 'semester' | 'year') {
		const branch = this._branchStoreService.getBranch();

		for (const period of branch.paymentInfo.rentPeriods) {
			if (period.type === periodType) {
				return period.date;
			}
		}
	}

	public getDate(orderItemType: "semester" | "year" | "one" | "two" | "buy" | "buyout" | "extend", customerItem?: CustomerItem): Date {
		if (orderItemType === 'one' || orderItemType === 'semester') {
			return this.getPeriodDate('semester');
		} else if (orderItemType === 'two' || orderItemType === 'year') {
			return this.getPeriodDate('year');
		} else if (orderItemType === 'extend') {
			return this.getExtendDate('semester');
		}
	}

	public daysUntil(date: Date): string {
		return moment(date).endOf('day').fromNow();
	}

	public getCurrentYear(): string {
		return moment().format('YYYY');
	}

	public isDeadlineExpired(deadline: string): boolean {
		return (new Date(deadline).getTime() < new Date().getTime());
	}

}
