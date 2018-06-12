import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderComponent} from './order.component';
import {Component, Injectable, Input} from "@angular/core";
import {UserService} from "../user.service";
import {OrderService, UserDetailService} from "@wizardcoder/bl-connect";
import {FaIconStubComponent} from "../../../test/stubs/fa-icon.component.stub";

@Injectable()
class UserStubService {

}

@Injectable()
class OrderStubService {

}

@Injectable()
class UserDetailStubService {

}

@Component({selector: 'app-order-info', template: ''})
class OrderInfoStubComponent {
	@Input() order;

}

describe('OrderComponent', () => {
	let component: OrderComponent;
	let fixture: ComponentFixture<OrderComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				OrderComponent,
				FaIconStubComponent,
				OrderInfoStubComponent
			],
			providers: [
				{provide: UserService, useVale: new UserStubService()},
				{provide: OrderService, useVale: new OrderStubService()},
				{provide: UserDetailService, useVale: new UserDetailStubService()}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OrderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
