import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BranchSelectComponent} from './branch-select.component';
import {RouterTestingModule} from "@angular/router/testing";
import {Component, Injectable, Input} from "@angular/core";
import {BranchService} from "@wizardcoder/bl-connect";
import {BranchStoreService} from "../branch-store.service";


@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon: any;
	@Input() size: any;
}

@Component({selector: 'app-blc-spinner', template: ''})
class BlcSpinnerStubComponent {
	@Input() loading: boolean;
}

@Injectable()
class BranchStubService {
	get() {
		return new Promise((resolve, reject) => {

		});
	}
}

@Injectable()
class BranchStoreStubService {
	redirectUrl = '';
	setCurrentBranch(branch: any) {

	}

	getBranch() {

	}
}

describe('BranchSelectComponent', () => {
	let component: BranchSelectComponent;
	let fixture: ComponentFixture<BranchSelectComponent>;


	const branchStoreStubService = new BranchStoreStubService();
	const branchStubService = new BranchStubService();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				BranchSelectComponent,
				FaIconStubComponent,
				BlcSpinnerStubComponent
			],
			imports: [
				RouterTestingModule,
			],
			providers: [
				{provide: BranchService, useValue: branchStubService},
				{provide: BranchStoreService, useValue: branchStoreStubService}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BranchSelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
