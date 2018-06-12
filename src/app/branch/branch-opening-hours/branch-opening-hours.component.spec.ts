import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BranchOpeningHoursComponent} from './branch-opening-hours.component';
import {Injectable} from "@angular/core";
import {Branch} from "@wizardcoder/bl-model";
import {BranchOpeningHoursService} from "./branch-opening-hours.service";


@Injectable()
class BranchOpeningHoursServiceStub {
	getOpeningHours(branch: Branch) {
		return new Promise((resolve, reject) => {

		});
	}
}



describe('BranchOpeningHoursComponent', () => {
	let component: BranchOpeningHoursComponent;
	let fixture: ComponentFixture<BranchOpeningHoursComponent>;

	const branchOpeningHoursServiceStub = new BranchOpeningHoursServiceStub();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BranchOpeningHoursComponent],
			providers: [
				{provide: BranchOpeningHoursService, useValue: branchOpeningHoursServiceStub}
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
