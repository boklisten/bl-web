import { Injectable } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { TokenService, UserSessionService } from "@boklisten/bl-connect";
import { Subject } from "rxjs";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
	providedIn: "root",
})
export class BlNextLinkerService {
	private readonly _login$: Subject<boolean>;
	private readonly _logout$: Subject<boolean>;

	constructor(
		private _tokenService: TokenService,
		private _userSessionService: UserSessionService,
		private route: ActivatedRoute,
		private router: Router,
		private tokenService: TokenService
	) {
		this._login$ = new Subject<boolean>();
		this._logout$ = new Subject<boolean>();
		this.onBlConnectLogout();
	}

	public redirectToBlNext(subPath: string) {
		const url = new URL(`${environment.nextPath}${subPath}`);
		if (this.isLoggedIn()) {
			const refreshToken = this.tokenService.getRefreshToken();
			const accessToken = this.tokenService.getAccessToken();
			url.searchParams.append("refresh_token", refreshToken);
			url.searchParams.append("access_token", accessToken);
		}
		window.location.replace(url.toString());
	}

	public receiveTokens() {
		this.route.queryParams.subscribe((params) => {
			if (params["logout"]) {
				this.handleLogout();
				this.router.navigate([], { replaceUrl: true });
				this._logout$.next(true);
				return;
			}
			if (params["access_token"] && params["refresh_token"]) {
				this.tokenService.addAccessToken(params["access_token"]);
				this.tokenService.addRefreshToken(params["refresh_token"]);
				this.router.navigate([], {
					queryParams: {
						...params,
						refresh_token: null,
						access_token: null,
					},
					replaceUrl: true,
				});
				this._login$.next(true);
			}
		});
	}

	private onBlConnectLogout() {
		this._userSessionService.onLogout().subscribe(() => {
			this.logout();
		});
	}

	public onLogin(): Observable<boolean> {
		return this._login$;
	}

	public onLogout(): Observable<boolean> {
		return this._logout$;
	}

	public isLoggedIn() {
		return this._tokenService.haveAccessToken();
	}

	public handleLogout() {
		this._tokenService.removeTokens();
		this._logout$.next(true);
	}

	public logout() {
		this.handleLogout();
		// Hand over responsibility to bl-next
		this.redirectToBlNext("auth/logout");
	}
}
