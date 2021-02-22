import {
	async,
	ComponentFixture,
	fakeAsync,
	TestBed,
	tick,
} from "@angular/core/testing";

import { UserEditComponent } from "./user-edit.component";
import {
	Component,
	EventEmitter,
	Injectable,
	Input,
	Output,
} from "@angular/core";
import { UserService } from "../user.service";
import { UserDetailService } from "@boklisten/bl-connect";
import Jasmine = jasmine.Jasmine;
import Spy = jasmine.Spy;
import { of } from "rxjs/internal/observable/of";
import { UserDetail } from "@boklisten/bl-model";
import { Subject } from "rxjs/internal/Subject";
import { UserEditService } from "./user-edit.service";

@Component({ selector: "bl-user-detail-edit", template: "" })
class UserDetailEditStubComponent {
	@Input() userDetail: any;
	@Output() patchValues: EventEmitter<any>;
}

@Injectable()
class UserStubService {
	getUserDetail() {
		return Promise.resolve({ id: "userDetail1" });
	}

	onUserDetailChange() {
		return new Subject();
	}
}

@Component({ selector: "app-blc-spinner", template: "" })
class BlcSpinnerStubComponent {
	@Input() loading;
}

@Injectable()
class UserEditStubService {}

describe("UserEditComponent", () => {
	let component: UserEditComponent;
	let fixture: ComponentFixture<UserEditComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				UserEditComponent,
				UserDetailEditStubComponent,
				BlcSpinnerStubComponent,
			],
			providers: [
				{ provide: UserService, useClass: UserStubService },
				{ provide: UserEditService, useClass: UserEditStubService },
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
