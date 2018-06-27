import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BlcSpinnerComponent} from './blc-spinner.component';
import {Component, Input} from "@angular/core";

@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon: any;
	@Input() spin: any;
	@Input() size: any;
}

describe('BlcSpinnerComponent', () => {
	let component: BlcSpinnerComponent;
	let fixture: ComponentFixture<BlcSpinnerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				BlcSpinnerComponent,
				FaIconStubComponent
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BlcSpinnerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
