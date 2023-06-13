import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PeerToPeerLinkerComponent } from "./peer-to-peer-linker.component";

describe("PeerToPeerLinkerComponent", () => {
	let component: PeerToPeerLinkerComponent;
	let fixture: ComponentFixture<PeerToPeerLinkerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PeerToPeerLinkerComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PeerToPeerLinkerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
