import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CartConfirmComponent } from "./cart-confirm.component";
import { Injectable } from "@angular/core";
import { CartCheckoutService } from "../cart-checkout/cart-checkout.service";
import { ActivatedRoute, Router } from "@angular/router";
import { StorageService } from "@boklisten/bl-connect";
import { Subject } from "rxjs/internal/Subject";

@Injectable()
class CartCheckoutStubService {}

@Injectable()
class RouterStub {
	navigateByUrl(url: string) {}
}

@Injectable()
class StorageStubService {}

@Injectable()
class ActivatedRouteStub {
	queryParams: Subject<any>;

	constructor() {
		this.queryParams = new Subject<any>();
	}
}

describe("CartConfirmComponent", () => {
	let component: CartConfirmComponent;
	let fixture: ComponentFixture<CartConfirmComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CartConfirmComponent],
			providers: [
				{
					provide: CartCheckoutService,
					useClass: CartCheckoutStubService,
				},
				{ provide: Router, useClass: RouterStub },
				{ provide: StorageService, useClass: StorageStubService },
				{ provide: ActivatedRoute, useClass: ActivatedRouteStub },
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CartConfirmComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
