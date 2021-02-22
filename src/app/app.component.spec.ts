import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { RouterTestingModule } from "@angular/router/testing";
import { Component } from "@angular/core";

@Component({ selector: "app-header", template: "" })
class HeaderStubComponent {}

@Component({ selector: "app-footer", template: "" })
class FooterStubComponent {}

@Component({ selector: "app-header-alert", template: "" })
class AppHeaderAlertStubComponent {}

@Component({ selector: "router-outlet", template: "" })
class RouterOutletStubComponent {}

describe("AppComponent", () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [
				AppComponent,
				HeaderStubComponent,
				FooterStubComponent,
				RouterOutletStubComponent,
				AppHeaderAlertStubComponent,
			],
		}).compileComponents();
	}));
	it("should create the app", async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
	it(`should have as title 'app'`, async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual("app");
	}));
});
