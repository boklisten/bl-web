import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CartDeliveryComponent } from "./cart-delivery.component";
import { Component, Injectable, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BlCommonModule } from "../../bl-common/bl-common.module";
import { DateService } from "../../date/date.service";
import { CartDeliveryService } from "./cart-delivery.service";
import { UserService } from "../../user/user.service";
import { BranchStoreService } from "../../branch/branch-store.service";
import { Subject } from "rxjs";
import { Branch } from "@wizardcoder/bl-model";

@Component({ selector: "fa-icon", template: "" })
class FaIconStubComponent {
	@Input() icon: any;
	@Input() spin: any;
}

@Injectable()
class DateStubService {}

@Injectable()
class CartDeliveryStubService {
	getDelivery() {}

	onDeliveryFailure() {
		return new Subject();
	}

	onDeliveryChange() {
		return new Subject();
	}

	getDefaultDeliveryMethod() {}

	setBranchDelivery() {}
}

@Injectable()
class UserStubService {
	getUserDetail() {
		return new Promise((resolve, reject) => {});
	}
}

@Injectable()
class BranchStoreStubService {
	getBranch() {
		return {} as Branch;
	}
}

describe("CartDeliveryComponent", () => {
	let component: CartDeliveryComponent;
	let fixture: ComponentFixture<CartDeliveryComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CartDeliveryComponent, FaIconStubComponent],
			imports: [FormsModule, BlCommonModule],
			providers: [
				{ provide: DateService, useValue: new DateStubService() },
				{
					provide: CartDeliveryService,
					useValue: new CartDeliveryStubService()
				},
				{ provide: UserService, useValue: new UserStubService() },
				{
					provide: BranchStoreService,
					useValue: new BranchStoreStubService()
				}
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CartDeliveryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
