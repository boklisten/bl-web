import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderUserDetailAlertComponent} from './header-user-detail-alert.component';
import {Component, Injectable, Input} from "@angular/core";
import {Router} from "@angular/router";
import {UserService} from "../../user/user.service";

@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon: any;
}

@Injectable()
class RouterStubService {

}

@Injectable()
class UserStubService {
	isUserDetailValid(): Promise<boolean> {
		return Promise.resolve(true);
	}
}

describe('HeaderUserDetailAlertComponent', () => {
	let component: HeaderUserDetailAlertComponent;
	let fixture: ComponentFixture<HeaderUserDetailAlertComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				HeaderUserDetailAlertComponent,
				FaIconStubComponent
			],
			providers: [
				{provide: Router, useClass: RouterStubService},
				{provide: UserService, useClass: UserStubService}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderUserDetailAlertComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
