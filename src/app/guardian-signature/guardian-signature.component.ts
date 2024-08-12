import { Component, OnInit, ViewChild } from "@angular/core";
import { CartSignatureComponent } from "../cart/cart-signature/signature.component";
import { SignatureService } from "@boklisten/bl-connect";

@Component({
	selector: "app-guardian-signature",
	templateUrl: "./guardian-signature.component.html",
})
export class GuardianSignatureComponent implements OnInit {
	public isSignatureByGuardianRequired: boolean = false;
	public customerName: string;
	public guardianName: string;
	public isSigned: boolean = false;
	public loaded: boolean = false;

	@ViewChild("signatureComponent")
	private signatureComponent: CartSignatureComponent;

	constructor(private _signatureService: SignatureService) {}

	ngOnInit(): void {
		// TODO: take in customer id from URL [...]/signering/[customerId]
		// TODO: check if required using endpoint, display status messages if not needed
		// TODO: display error if customer id is not found
		this.isSignatureByGuardianRequired = true;
		this.customerName = "Adrian";
		this.guardianName = "Lars";
		this.loaded = true;
	}

	onIsSignedChanged(isSignatureEdited: boolean) {
		this.isSigned = isSignatureEdited;
	}

	async onConfirmClick() {
		const signature = this.signatureComponent.getSerializedSignature();
		// TODO: use new endpoint /signature/guardian to add the signature (public endpoint). Probably need to add this and the status check endpoint to bl-connect first
		await this._signatureService.add(signature);
	}
}
