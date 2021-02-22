import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MatchQuestionsComponent } from "./match-questions.component";

describe("MatchQuestionsComponent", () => {
	let component: MatchQuestionsComponent;
	let fixture: ComponentFixture<MatchQuestionsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MatchQuestionsComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MatchQuestionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
