import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderCartComponent} from './header-cart.component';
import {Component, Injectable, Input} from "@angular/core";
import {CartService} from "../../cart/cart.service";
import {Location} from "@angular/common";

@Injectable()
class CartStubService {
	isEmpty() {

	}

	getSize() {

	}
}

@Injectable()
class LocationStub {
	path() {
		return '';
	}
}

@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon: any;
}

describe('HeaderCartComponent', () => {
	let component: HeaderCartComponent;
	let fixture: ComponentFixture<HeaderCartComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				HeaderCartComponent,
				FaIconStubComponent
			],
			providers: [
				{provide: CartService, useValue: new CartStubService()},
				{provide: Location, useValue: new LocationStub()}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderCartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
