import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from "@angular/core";
import { SignatureService, UserDetailService } from "@boklisten/bl-connect";
import { CartOrderService } from "../cart-order/cart-order.service";
import { CartSignatureComponent } from "../cart-signature/signature.component";
import { UserService } from "../../user/user.service";
import { UserDetail } from "@boklisten/bl-model";
import { CartService } from "../cart.service";
import { BranchStoreService } from "../../branch/branch-store.service";
import * as moment from "moment";

@Component({
	selector: "app-cart-agreement",
	templateUrl: "./cart-agreement.component.html",
	styleUrls: ["./cart-agreement.component.scss"],
})
export class CartAgreementComponent implements OnInit {
	@Input() confirmed: boolean;
	@Output() confirmedChange: EventEmitter<boolean>;
	showAgreement: boolean = false;
	isSignatureByCustomerRequired: boolean = false;
	isUnderage: boolean = false;
	isSigned: boolean = false;
	customerName: string;

	loaded: boolean = false;

	@ViewChild("signatureComponent")
	private signatureComponent: CartSignatureComponent;
	private _userDetail: UserDetail;

	constructor(
		private _cartOrderService: CartOrderService,
		private _cartService: CartService,
		private _signatureService: SignatureService,
		private _userService: UserService,
		private _branchStoreService: BranchStoreService
	) {
		this.confirmedChange = new EventEmitter<boolean>();
	}

	async ngOnInit() {
		await this._userService.reloadUserDetail();
		this._userDetail = await this._userService.getUserDetail();
		this.isUnderage = moment(this._userDetail.dob).isAfter(
			moment(new Date()).subtract(18, "years")
		);
		this.isSignatureByCustomerRequired =
			!this.isUnderage &&
			(await this._cartService.isSignatureRequired(
				this._userDetail,
				this._cartOrderService.getOrder()
			));
		this.customerName = this._userDetail.name;
		this.loaded = true;
	}

	async onConfirmClick() {
		window.scroll(0, 0);
		if (this.isSignatureByCustomerRequired) {
			const signature = this.signatureComponent.getSerializedSignature();
			await this._signatureService.add(signature);
			await this._userService.reloadUserDetail();
			this._cartOrderService.setOrder({
				...this._cartOrderService.getOrder(),
				pendingSignature: false,
			});
		}
		this.confirmed = true;
		this.confirmedChange.emit(true);
	}

	onShowAgreement() {
		this.showAgreement = !this.showAgreement;
	}

	onIsSignedChanged(isSignatureEdited: boolean) {
		this.isSigned = isSignatureEdited;
	}
}
