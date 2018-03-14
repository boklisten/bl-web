import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartDeliveryComponent} from './cart-delivery.component';

describe('CartDeliveryComponent', () => {
	let component: CartDeliveryComponent;
	let fixture: ComponentFixture<CartDeliveryComponent>;
	
	beforeEach(async(() => {
		TestBed.configureTestingModule({
				declarations: [CartDeliveryComponent]
			})
			.compileComponents();
	}));
	
	beforeEach(() => {
		fixture = TestBed.createComponent(CartDeliveryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
