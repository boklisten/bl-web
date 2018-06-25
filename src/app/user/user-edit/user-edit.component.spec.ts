import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {UserEditComponent} from './user-edit.component';
import {Component, EventEmitter, Injectable, Input, Output} from "@angular/core";
import {UserService} from "../user.service";
import {UserDetailService} from "@wizardcoder/bl-connect";
import Jasmine = jasmine.Jasmine;
import Spy = jasmine.Spy;
import {of} from "rxjs/internal/observable/of";
import {UserDetail} from "@wizardcoder/bl-model";

@Component({selector: 'bl-user-detail-edit', template: ''})
class UserDetailEditStubComponent {
	@Input() userDetail: any;
	@Output() patchValues: EventEmitter<any>;
}

@Injectable()
class UserStubService {
	getUserDetail() {
		return Promise.resolve({id: 'userDetail1'});
	}
}

@Injectable()
class UserDetailStubService {
	update(id: string, data: any) {
		return new Promise((resolve, reject) => {

		});
	}
}

describe('UserEditComponent', () => {
	let component: UserEditComponent;
	let fixture: ComponentFixture<UserEditComponent>;
	let updateUserDetailSpy;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				UserEditComponent,
				UserDetailEditStubComponent
			],
			providers: [
				{provide: UserService, useClass: UserStubService},
				{provide: UserDetailService, useClass: UserDetailStubService}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		const userDetailService = jasmine.createSpyObj('UserDetailStubService', ['update']);
		const userService = jasmine.createSpyObj('UserService', ['getUserDetail']);
		let userGetUserDetailSpy = userService.getUserDetail.and.returnValue(of(Promise.resolve({id: 'userDetail1'})))

		updateUserDetailSpy = userDetailService.update.and.returnValue(Promise.resolve('hi'));

		fixture = TestBed.createComponent(UserEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();



	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});


});
