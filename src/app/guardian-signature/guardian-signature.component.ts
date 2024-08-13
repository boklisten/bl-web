import { Component, OnInit, ViewChild } from "@angular/core";
import { CartSignatureComponent } from "../cart/cart-signature/signature.component";
import { SignatureService, UserDetailService } from "@boklisten/bl-connect";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-guardian-signature",
	templateUrl: "./guardian-signature.component.html",
})
export class GuardianSignatureComponent implements OnInit {
	public signatureInfo: {
		message?: string;
		customerName?: string;
		guardianSignatureRequired: boolean;
	};
	public isSigned: boolean = false;
	public loaded: boolean = false;
	public userFound: boolean = true;
	public signingCompleted: boolean = false;
	customerId: string;
	@ViewChild("signatureComponent")
	private signatureComponent: CartSignatureComponent;

	constructor(
		private route: ActivatedRoute,
		private _signatureService: SignatureService
	) {}

	async ngOnInit() {
		this.customerId = this.route.snapshot.paramMap.get("customerId");
		try {
			this.signatureInfo = await this._signatureService.checkGuardianSignature(
				this.customerId
			);
		} catch {
			this.userFound = false;
			return;
		}

		this.loaded = true;
	}

	onIsSignedChanged(isSignatureEdited: boolean) {
		this.isSigned = isSignatureEdited;
	}

	async onConfirmClick() {
		const signature = this.signatureComponent.getSerializedSignature();
		await this._signatureService.addGuardianSignature({
			customerId: this.customerId,
			base64EncodedImage: signature.base64EncodedImage,
			signingName: signature.signingName,
		});
		this.signingCompleted = true;
	}
}
