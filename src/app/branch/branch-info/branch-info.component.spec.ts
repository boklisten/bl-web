import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BranchInfoComponent} from './branch-info.component';
import {Component, Injectable, Input} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {Branch} from "@wizardcoder/bl-model";
import {BranchService} from "@wizardcoder/bl-connect";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";


@Component({selector: 'ngb-alert', template: ''})
class NgbAlertStubComponent {
	@Input() type: string;
}

@Component({selector: 'app-branch-select', template: ''})
class BranchSelectStubComponent {}

@Component({selector: 'app-branch-contact-info', template: ''})
class BranchContactInfoStubComponent {
	@Input() branch: Branch;
}

@Component({selector: 'app-branch-opening-hours', template: ''})
class BranchOpeningHoursStubComponent {
	@Input() branch: Branch;
}

@Injectable()
class ActivatedRouteStub {
	public snapshot: any;

	constructor() {
		this.snapshot = {
			paramMap: {
				get: (id: string) => ''
			}
		};
	}
}

@Injectable()
class BranchServiceStub {
	getById(id: string): Promise<any> {
		return new Promise((resolve, reject) => {

		});
	}
}


describe('BranchInfoComponent', () => {
	let component: BranchInfoComponent;
	let fixture: ComponentFixture<BranchInfoComponent>;

	const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
	const activatedRouteStub = new ActivatedRouteStub();
	const branchServiceStub = new BranchServiceStub();


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				BranchInfoComponent,
				NgbAlertStubComponent,
				BranchSelectStubComponent,
				BranchContactInfoStubComponent,
				BranchOpeningHoursStubComponent
			],
			providers: [
				{provide: BranchService, useValue: branchServiceStub},
				{provide: Router, useValue: routerSpy},
				{provide: ActivatedRoute, useValue: activatedRouteStub}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BranchInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
