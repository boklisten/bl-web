import { Component, Input, OnInit } from "@angular/core";
import { Order } from "@wizardcoder/bl-model";
import { PrintPdfService, OrderPdfService } from "@wizardcoder/bl-connect";
import moment from "moment-es6";

@Component({
	selector: "app-order-info",
	templateUrl: "./order-info.component.html",
	styleUrls: ["./order-info.component.scss"]
})
export class OrderInfoComponent implements OnInit {
	@Input() order: Order;

	showDelivery: boolean;

	constructor(
		private pdfPrintService: PrintPdfService,
		private orderPdfService: OrderPdfService
	) {}

	ngOnInit() {
		this.showDelivery = this.shouldShowDelivery();
	}

	shouldShowDelivery() {
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

	printReceipt() {
		this.orderPdfService
			.getOrderReceiptPdf(this.order.id)
			.then(pdfContent => {
				const fileName =
					"ordredetaljer_" +
					moment(this.order.creationTime).format("DDMMYYYY") +
					".pdf";
				this.pdfPrintService.printPdf(pdfContent, fileName);
			})
			.catch(() => {
				console.log("could not get pdf");
			});
	}

	printAgreement() {
		this.orderPdfService
			.getOrderAgreementPdf(this.order.id)
			.then(pdfContent => {
				const fileName =
					"laaneavtale_" +
					moment(this.order.creationTime).format("DDMMYYYY") +
					".pdf";
				this.pdfPrintService.printPdf(pdfContent, fileName);
			})
			.catch(() => {
				console.log("could not get pdf");
			});
	}

	public printOrderPdf() {}
}
