import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartAgreementComponent} from './cart-agreement.component';
import {Component, Input} from "@angular/core";

@Component({selector: 'app-info-agreement-rent', template: ''})
class InfoAgreementStubComponent {

}

@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon: any;
}

describe('CartAgreementComponent', () => {
	let component: CartAgreementComponent;
	let fixture: ComponentFixture<CartAgreementComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				CartAgreementComponent,
				InfoAgreementStubComponent,
				FaIconStubComponent
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CartAgreementComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
