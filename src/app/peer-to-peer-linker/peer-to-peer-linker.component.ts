import { Component, OnInit } from "@angular/core";
import { TokenService } from "@boklisten/bl-connect";
import { environment } from "../../environments/environment";

@Component({
	selector: "app-peer-to-peer-linker",
	templateUrl: "./peer-to-peer-linker.component.html",
	styleUrls: ["./peer-to-peer-linker.component.css"],
})
export class PeerToPeerLinkerComponent implements OnInit {
	constructor(private _tokenService: TokenService) {}

	ngOnInit(): void {
		const refreshToken = this._tokenService.getRefreshToken();
		const accessToken = this._tokenService.getAccessToken();
		window.location.href = `${environment.nextPath}matches?refresh_token=${refreshToken}&access_token=${accessToken}`;
	}
}
