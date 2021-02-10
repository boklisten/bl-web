import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BranchSelectComponent} from './branch-select.component';
import {RouterTestingModule} from "@angular/router/testing";
import {Component, Injectable, Input} from "@angular/core";
import {BranchService} from "@boklisten/bl-connect";
import {BranchStoreService} from "../branch-store.service";
import {Subject} from "rxjs/internal/Subject";


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

	onBranchChange() {
		return new Subject().asObservable();
	}

	getBranch() {

	}
}

describe('BranchSelectComponent', () => {
	let component: BranchSelectComponent;
	let fixture: ComponentFixture<BranchSelectComponent>;

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
				{provide: BranchService, useClass: BranchStubService},
				{provide: BranchStoreService, useClass: BranchStoreStubService}
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
