import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemTypeSelectComponent} from './item-type-select.component';

describe('CartItemTypeSelectComponent', () => {
	let component: ItemTypeSelectComponent;
	let fixture: ComponentFixture<ItemTypeSelectComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ItemTypeSelectComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ItemTypeSelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
