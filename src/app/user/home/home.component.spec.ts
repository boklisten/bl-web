import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {Component, Injectable, Input} from "@angular/core";
import {Router} from "@angular/router";
import {BranchStoreService} from "../../branch/branch-store.service";
import {UserService} from "../user.service";
import {BranchService} from "@wizardcoder/bl-connect";

@Injectable()
class RouterStub {

}

@Injectable()
class BranchStoreStubService {

}

@Injectable()
class UserStubService {

}

@Injectable()
class BranchStubService {

}

@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon;
}

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				HomeComponent,
				FaIconStubComponent
			],
			providers: [
				{provide: Router, useValue: new RouterStub()},
				{provide: BranchStoreService, useValue: new BranchStoreStubService()},
				{provide: UserService, useValue: new UserStubService()},
				{provide: BranchService, useValue: new BranchStubService()}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
