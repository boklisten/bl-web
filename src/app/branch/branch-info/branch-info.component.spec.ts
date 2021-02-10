import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BranchInfoComponent} from './branch-info.component';
import {Component, Injectable, Input} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {Branch} from "@boklisten/bl-model";
import {BranchService} from "@boklisten/bl-connect";
import {ActivatedRoute, Router} from "@angular/router";
import {BranchStoreService} from "../branch-store.service";


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

@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon: any;
}

@Component({selector: 'app-blc-spinner', template: ''})
class BlcSpinnerStubComponent {
	@Input() loading;
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

	get() {
		return new Promise((resolve, reject) => {

		});
	}
}

@Injectable()
class BranchStoreStubService {
	getBranch() {
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
				BranchOpeningHoursStubComponent,
				FaIconStubComponent,
				BlcSpinnerStubComponent
			],
			providers: [
				{provide: BranchService, useValue: branchServiceStub},
				{provide: Router, useValue: routerSpy},
				{provide: ActivatedRoute, useValue: activatedRouteStub},
				{provide: BranchStoreService, useClass: BranchStoreStubService}
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
