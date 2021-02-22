import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CartGoToBarComponent } from "./cart-go-to-bar.component";
import { Injectable } from "@angular/core";
import { CartService } from "../../cart/cart.service";
import { BlCommonModule } from "../../bl-common/bl-common.module";

@Injectable()
class CartStubService {
	getCart() {
		return [];
	}

	getTotalPrice() {}
}

describe("CartGoToBarComponent", () => {
	let component: CartGoToBarComponent;
	let fixture: ComponentFixture<CartGoToBarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CartGoToBarComponent],
			providers: [
				{ provide: CartService, useValue: new CartStubService() },
			],
			imports: [BlCommonModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CartGoToBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
