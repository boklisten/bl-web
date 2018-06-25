import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderAlertComponent} from './header-alert.component';
import {Component} from "@angular/core";

@Component({selector: 'app-header-user-detail-alert', template: ''})
class HeaderUserDetailAlertStubComponent {

}

describe('HeaderAlertComponent', () => {
	let component: HeaderAlertComponent;
	let fixture: ComponentFixture<HeaderAlertComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				HeaderAlertComponent,
				HeaderUserDetailAlertStubComponent
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderAlertComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
