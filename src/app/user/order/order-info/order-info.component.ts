import { Component, Input, OnInit } from "@angular/core";
import { Order } from "@wizardcoder/bl-model";
import { PrintPdfService, OrderPdfService } from "@wizardcoder/bl-connect";
import moment from "moment-es6";
import { saveAs } from "file-saver";

@Component({
	selector: "app-order-info",
	templateUrl: "./order-info.component.html",
	styleUrls: ["./order-info.component.scss"]
})
export class OrderInfoComponent implements OnInit {
	@Input() order: Order;

	public receiptUrl: string;
	public agreementUrl: string;
	public showDelivery: boolean;
	public showAgreementPrintOut: boolean;

	constructor(
		private pdfPrintService: PrintPdfService,
		private orderPdfService: OrderPdfService
	) {}

	ngOnInit() {
		this.showDelivery = this.shouldShowDelivery();
		this.showAgreementPrintOut = this.shouldAgreementBeVisisble();
	}

	public shouldShowDelivery() {
		if (this.order && this.order.handoutByDelivery) {
			return true;
		}
		if (this.order) {
			for (const orderItem of this.order.orderItems) {
				if (
					orderItem.type !== "buyout" &&
					orderItem.type !== "return" &&
					orderItem.type !== "extend"
				) {
					return true;
				}
			}
		}
		return false;
	}

	public getReceipt() {
		this.orderPdfService
			.getOrderReceiptPdf(this.order.id)
			.then((pdfContent: any) => {
				this.receiptUrl = this.generateBlobUrl(pdfContent);

				console.log(this.receiptUrl);
			})
			.catch(() => {
				console.log("could not get pdf");
			});
	}

	public getAgreement() {
		this.orderPdfService
			.getOrderAgreementPdf(this.order.id)
			.then((pdfContent: any) => {
				this.agreementUrl = this.generateBlobUrl(pdfContent);
				console.log(this.agreementUrl);
			})
			.catch(() => {
				console.log("could not get pdf");
			});
	}

	private shouldAgreementBeVisisble() {
		for (const orderItem of this.order.orderItems) {
			if (orderItem.type !== "rent" && orderItem.type !== "loan") {
				return false;
			}
		}
		return this.order.amount === 0;
	}

	public openAgreementUrl() {
		window.open(this.agreementUrl);
	}

	public openReceiptUrl() {
		window.open(this.receiptUrl);
	}

	private generateBlobUrl(pdfContent: any): string {
		const byteCharacters = atob(pdfContent);
		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteNumbers.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}

		const blob = new Blob([new Uint8Array(byteNumbers)], {
			type: "application/pdf"
		});

		return URL.createObjectURL(blob);
	}
}
