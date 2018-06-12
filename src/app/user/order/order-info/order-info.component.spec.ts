import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderInfoComponent} from './order-info.component';
import {Component, Injectable, Input, Pipe} from "@angular/core";


@Component({selector: 'app-order-item-info', template: ''})
class OrderItemInfoStubComponent {
	@Input() orderItem;
}

@Component({selector: 'app-order-delivery-info', template: ''})
class OrderDeliveryInfoStubComponent {
	@Input() order;
}


@Component({selector: 'app-order-payment-info', template: ''})
class OrderPaymentInfoStubComponent {
	@Input() order;
}

@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon: any;
}

@Pipe({name: 'blcDate'})
class BlcDateStubPipe {

}

describe('OrderInfoComponent', () => {
	let component: OrderInfoComponent;
	let fixture: ComponentFixture<OrderInfoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				OrderInfoComponent,
				OrderItemInfoStubComponent,
				OrderDeliveryInfoStubComponent,
				OrderPaymentInfoStubComponent,
				FaIconStubComponent,
				BlcDateStubPipe
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OrderInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
