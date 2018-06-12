import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemSelectComponent} from './item-select.component';
import {Component, Injectable, Input} from "@angular/core";
import {Router} from "@angular/router";
import {BranchStoreService} from "../../branch/branch-store.service";

@Injectable()
class RouterStub {

}

@Injectable()
class BranchStoreStubService {
	getActiveBranch() {
		return new Promise((resolve, reject) => {

		});
	}
}

@Component({selector: 'app-item-display-category', template: ''})
class ItemDisplayCategoryStubComponent {
	@Input() branch;
}

@Component({selector: 'app-cart-go-to-bar', template: ''})
class CartGoToBarStubComponent {
}

describe('ItemSelectComponent', () => {
	let component: ItemSelectComponent;
	let fixture: ComponentFixture<ItemSelectComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				ItemSelectComponent,
				ItemDisplayCategoryStubComponent,
				CartGoToBarStubComponent
			],
			providers: [
				{provide: Router, useValue: new RouterStub()},
				{provide: BranchStoreService, useValue: new BranchStoreStubService()}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ItemSelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
