import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CartRoutingModule } from "./cart-routing.module";
import { CartComponent } from "./cart.component";
import { CartService } from "./cart.service";
import { FormsModule } from "@angular/forms";
import {
	NgbModule,
	NgbModalModule,
	NgbProgressbarModule,
} from "@ng-bootstrap/ng-bootstrap";
import { DateService } from "../date/date.service";
import { PriceService } from "../price/price.service";
import { ItemModule } from "../item/item.module";
import { CartPaymentComponent } from "./cart-payment/cart-payment.component";
import { CartPaymentService } from "./cart-payment/cart-payment.service";
import { CartDeliveryComponent } from "./cart-delivery/cart-delivery.component";
import { CartPaymentDibsComponent } from "./cart-payment/cart-payment-dibs/cart-payment-dibs.component";
import { CartDeliveryService } from "./cart-delivery/cart-delivery.service";
import { CartCheckoutComponent } from "./cart-checkout/cart-checkout.component";
import { CartCheckoutService } from "./cart-checkout/cart-checkout.service";
import { CartEmptyComponent } from "./cart-empty/cart-empty.component";
import { CartOrderService } from "./cart-order/cart-order.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BlCommonModule } from "../bl-common/bl-common.module";
import { CartSummaryComponent } from "./cart-summary/cart-summary.component";
import { CartAgreementComponent } from "./cart-agreement/cart-agreement.component";
import { InfoModule } from "../info/info.module";
import { CartConfirmComponent } from "./cart-confirm/cart-confirm.component";
import { CartOrderCheckoutComponent } from "./cart-order-checkout/cart-order-checkout.component";
import { CartPaymentOptionComponent } from "./cart-payment-option/cart-payment-option.component";
import { CartPartlyPaymentInfoComponent } from "./cart-partly-payment-info/cart-partly-payment-info.component";
import { CartSignatureComponent } from "./cart-signature/signature.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NgbModule,
		CartRoutingModule,
		ItemModule,
		FontAwesomeModule,
		BlCommonModule,
		NgbProgressbarModule,
		InfoModule,
		NgbModalModule,
	],
	declarations: [
		CartComponent,
		CartPaymentComponent,
		CartDeliveryComponent,
		CartPaymentDibsComponent,
		CartCheckoutComponent,
		CartEmptyComponent,
		CartSummaryComponent,
		CartAgreementComponent,
		CartConfirmComponent,
		CartOrderCheckoutComponent,
		CartPaymentOptionComponent,
		CartPartlyPaymentInfoComponent,
		CartSignatureComponent,
	],
	providers: [
		CartService,
		DateService,
		CartOrderService,
		PriceService,
		CartPaymentService,
		CartDeliveryService,
		CartCheckoutService,
	],
	exports: [CartSignatureComponent],
})
export class CartModule {}
