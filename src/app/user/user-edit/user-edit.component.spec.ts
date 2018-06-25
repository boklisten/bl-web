import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserEditComponent} from './user-edit.component';
import {Component, EventEmitter, Injectable, Input, Output} from "@angular/core";
import {UserService} from "../user.service";

@Component({selector: 'bl-user-detail-edit', template: ''})
class UserDetailEditStubComponent {
	@Input() userDetail: any;
	@Output() patchValues: EventEmitter<any>;
}

@Injectable()
class UserStubService {
	getUserDetail() {
		return new Promise((resolve, reject) => {

		});
	}
}

describe('UserEditComponent', () => {
	let component: UserEditComponent;
	let fixture: ComponentFixture<UserEditComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				UserEditComponent,
				UserDetailEditStubComponent
			],
			providers: [
				{provide: UserService, useClass: UserStubService}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
