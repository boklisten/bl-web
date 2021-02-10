import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BranchOpeningHoursComponent} from './branch-opening-hours.component';
import {Component, Injectable, Input, Pipe} from "@angular/core";
import {Branch} from "@boklisten/bl-model";
import {BranchOpeningHoursService} from "./branch-opening-hours.service";
import {BlCommonModule} from "../../bl-common/bl-common.module";
import {DateService} from "../../date/date.service";


@Injectable()
class BranchOpeningHoursServiceStub {
	getOpeningHours(branch: Branch) {
		return new Promise((resolve, reject) => {

		});
	}
}

@Component({selector: 'fa-icon', template: ''})
class FaIconComponent {
	@Input() icon: any;
}

@Pipe({name: 'blcDate'})
class BlcDateStubPipe {

}

@Injectable()
class DateStubService {

}

@Component({selector: 'app-blc-spinner', template: ''})
class BlcSpinnerStubComponent {
	@Input() loading;
}





describe('BranchOpeningHoursComponent', () => {
	let component: BranchOpeningHoursComponent;
	let fixture: ComponentFixture<BranchOpeningHoursComponent>;

	const branchOpeningHoursServiceStub = new BranchOpeningHoursServiceStub();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				BranchOpeningHoursComponent,
				FaIconComponent,
				BlcDateStubPipe,
				BlcSpinnerStubComponent
			],
			imports: [],
			providers: [
				{provide: BranchOpeningHoursService, useValue: branchOpeningHoursServiceStub},
				{provide: DateService, useClass: DateStubService}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BranchOpeningHoursComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
