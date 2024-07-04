import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { TokenService } from "@boklisten/bl-connect";
import { AuthLoginService } from "@boklisten/bl-login";

@Injectable({
	providedIn: "root",
})
export class BlNextLinkerService {
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private tokenService: TokenService,
		private authLoginService: AuthLoginService
	) {}

	public redirectToBlNext(subPath: string, appendTokens: boolean) {
		let href = `${environment.nextPath}${subPath}`;
		if (appendTokens && this.authLoginService.isLoggedIn()) {
			const refreshToken = this.tokenService.getRefreshToken();
			const accessToken = this.tokenService.getAccessToken();
			href += `?refresh_token=${refreshToken}&access_token=${accessToken}`;
		}
		window.location.href = href;
	}

	public receiveTokens() {
		this.route.queryParams.forEach((params) => {
			if (
				// Do not steal the params from bl-login
				!this.router.url.includes("auth/token") &&
				params["access_token"] &&
				params["refresh_token"]
			) {
				this.tokenService.addAccessToken(params["access_token"]);
				this.tokenService.addRefreshToken(params["refresh_token"]);
				this.router.navigate([], {
					queryParams: {
						...params,
						refresh_token: null,
						access_token: null,
					},
				});
			}
		});
	}
}
