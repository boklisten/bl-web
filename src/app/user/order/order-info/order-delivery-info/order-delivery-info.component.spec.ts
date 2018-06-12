import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderDeliveryInfoComponent} from './order-delivery-info.component';
import {Component, Injectable, Input, Pipe} from "@angular/core";
import {DeliveryService} from "@wizardcoder/bl-connect";
import {RouterTestingModule} from "@angular/router/testing";


@Injectable()
class DeliveryStubService {

}

@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon;
}

@Pipe({name: 'blcDate'})
class BlcDateStubPipe {

}

@Pipe({name: 'blcPrice'})
class BlcPriceStubPipe {

}

@Pipe({name: 'blcBranch'})
class BlcBranchStubPipe {

}

describe('OrderDeliveryInfoComponent', () => {
	let component: OrderDeliveryInfoComponent;
	let fixture: ComponentFixture<OrderDeliveryInfoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				OrderDeliveryInfoComponent,
				FaIconStubComponent,
				BlcDateStubPipe,
				BlcPriceStubPipe,
				BlcBranchStubPipe
			],
			providers: [
				{provide: DeliveryService, useValue: new DeliveryStubService()}
			],
			imports: [
				RouterTestingModule
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OrderDeliveryInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
