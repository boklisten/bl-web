import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemDisplayCategoryComponent} from './item-display-category.component';
import {Component, Directive, EventEmitter, Injectable, Input, Output} from "@angular/core";
import {BranchItemService, ItemService} from "@wizardcoder/bl-connect";
import {RouterModule} from "@angular/router";

@Component({selector: 'app-item-display', template: ''})
class ItemDisplayStubComponent {
	@Input() branch;
	@Input() compact;
	@Input() branchItem;
}

@Component({selector: 'app-blc-spinner', template: ''})
class BlcSpinnerStubComponent {
	@Input() loading: boolean;
}

@Component({selector: 'app-branch-item-category-filter', template: ''})
class BranchItemCategoryFilterStubComponent {
	@Input() branchItemCategories;
	@Output() branchItemCategoriesSelect;

	constructor () {
		this.branchItemCategoriesSelect = new EventEmitter<any>();
	}
}
/*
@Directive({
	selector: '[routerLink]',
	host: { '(click)': 'onClick()' }
})
export class RouterLinkStubDirective {
	@Input('routerLink') linkParams: any;
	navigatedTo: any = null;

	onClick() {
		this.navigatedTo = this.linkParams;
	}
}
*/


@Component({selector: 'ngb-alert', template: ''})
class NgbAlertStubComponent {
	@Input() type: any;
}

@Injectable()
class ItemStubService {

}

@Injectable()
class BranchItemStubService {
	getMandxyByIds() {
		return new Promise((resolve, reject) => {

		});
	}
}


describe('ItemDisplayCategoryComponent', () => {
	let component: ItemDisplayCategoryComponent;
	let fixture: ComponentFixture<ItemDisplayCategoryComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				ItemDisplayCategoryComponent,
				ItemDisplayStubComponent,
				BranchItemCategoryFilterStubComponent,
				NgbAlertStubComponent,
				BlcSpinnerStubComponent
			],
			providers: [
				{provide: ItemService, useValue: new ItemStubService()},
				{provide: BranchItemService, useValue: new BranchItemStubService()}
			],
			imports: [
				RouterModule
			]

		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ItemDisplayCategoryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
