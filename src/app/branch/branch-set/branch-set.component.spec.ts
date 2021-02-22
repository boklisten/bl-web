import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BranchSetComponent } from "./branch-set.component";
import { RouterTestingModule } from "@angular/router/testing";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({ selector: "fa-icon", template: "" })
class FaIconStubComponent {
	@Input() icon: any;
}

@Component({ selector: "app-branch-select", template: "" })
class BranchSelectStubComponent {
	@Output() branchSelect: EventEmitter<any>;

	constructor() {
		this.branchSelect = new EventEmitter<any>();
	}
}

describe("BranchSetComponent", () => {
	let component: BranchSetComponent;
	let fixture: ComponentFixture<BranchSetComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				BranchSetComponent,
				FaIconStubComponent,
				BranchSelectStubComponent,
			],
			imports: [RouterTestingModule],
			providers: [],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BranchSetComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
