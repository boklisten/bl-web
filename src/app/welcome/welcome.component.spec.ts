import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WelcomeComponent} from './welcome.component';
import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable()
class RouterStub {

}

@Injectable()
class ActivatedRouteStub {

}

describe('WelcomeComponent', () => {
	let component: WelcomeComponent;
	let fixture: ComponentFixture<WelcomeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [WelcomeComponent],
			providers: [
				{provide: Router, useValue: new RouterStub()},
				{provide: ActivatedRoute, useValue: new ActivatedRouteStub()}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(WelcomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
