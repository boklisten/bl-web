import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartEmptyComponent} from './cart-empty.component';
import {Component, Input} from "@angular/core";

@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon: any;
}


describe('CartEmptyComponent', () => {
	let component: CartEmptyComponent;
	let fixture: ComponentFixture<CartEmptyComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				CartEmptyComponent,
				FaIconStubComponent
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CartEmptyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
