import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: "app-auth-gateway",
	templateUrl: "./auth-gateway.component.html",
})
export class AuthGatewayComponent implements OnInit {
	constructor(private router: Router, private route: ActivatedRoute) {}

	ngOnInit(): void {
		setTimeout(() => {
			this.route.queryParams.forEach((params) => {
				this.router.navigate([params["redirect"] ?? "/"], {
					replaceUrl: true,
				});
			});
		}, 200);
	}
}
