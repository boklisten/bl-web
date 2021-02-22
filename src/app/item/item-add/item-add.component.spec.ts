import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemAddComponent } from "./item-add.component";
import { Component, Injectable, Input } from "@angular/core";
import { CartService } from "../../cart/cart.service";

@Injectable()
class CartStubService {}

@Component({ selector: "fa-icon", template: "" })
class FaIconStubComponent {
	@Input() icon: any;
}

describe("ItemAddComponent", () => {
	let component: ItemAddComponent;
	let fixture: ComponentFixture<ItemAddComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ItemAddComponent, FaIconStubComponent],
			providers: [
				{ provide: CartService, useValue: new CartStubService() },
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ItemAddComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
