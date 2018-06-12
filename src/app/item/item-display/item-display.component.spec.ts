import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemDisplayComponent} from './item-display.component';
import {Component, EventEmitter, Injectable, Input, Output, Pipe, PipeTransform} from "@angular/core";
import {Router, RouterModule} from "@angular/router";
import {BlCommonModule} from "../../bl-common/bl-common.module";
import {PriceService} from "../../price/price.service";
import {UserService} from "../../user/user.service";
import {ItemService} from "@wizardcoder/bl-connect";

@Component({selector: 'fa-icon', template: ''})
class FaIconStubComponent {
	@Input() icon: any;
}

@Component({selector: 'app-item-type-select', template: ''})
class ItemTypeSelectStubComponent {
	@Input() branchItem;
	@Input() item;
	@Input() customerItem;
	@Input() type;
	@Output() typeChange;

	constructor() {
		this.typeChange = new EventEmitter<any>();
	}
}

@Injectable()
class PriceStubService {

}

@Injectable()
class UserStubService {

}

@Injectable()
class ItemStubService {

}

@Injectable()
class RouterStub {

}

@Pipe({name: 'blcPrice'})
class BlcPriceStubPipe implements PipeTransform {
	transform() {}
}

@Pipe({name: 'blcCustomerItemPrice'})
class BlcCustomerItemPriceStubPipe implements PipeTransform {
	transform() {}
}

@Component({selector: 'app-item-add', template: ''})
class ItemAddStubComponent {
	@Input() branchItem;
	@Input() item;
	@Input() customerItem;
	@Input() type;
}

describe('ItemDisplayComponent', () => {
	let component: ItemDisplayComponent;
	let fixture: ComponentFixture<ItemDisplayComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				ItemDisplayComponent,
				FaIconStubComponent,
				ItemTypeSelectStubComponent,
				ItemAddStubComponent,
				BlcPriceStubPipe,
				BlcCustomerItemPriceStubPipe
			],
			providers: [
				{provide: Router, useValue: new RouterStub()},
				{provide: PriceService, useValue: new PriceStubService()},
				{provide: UserService, useValue: new UserStubService()},
				{provide: ItemService, useValue: new ItemStubService()}
			],
			imports: [
				RouterModule
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ItemDisplayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
