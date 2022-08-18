import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {OrderPdfService} from "@boklisten/bl-connect";

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css']
})
export class AgreementComponent implements OnInit {
	orderID: string;
	blobURL: string;
	wait: boolean = true;

  constructor(private route: ActivatedRoute,
			  private orderPdfService: OrderPdfService
  ) { }

  ngOnInit(): void {
	  this.route.queryParams
		  .subscribe(params => {
				  this.orderID = params.orderID;
			  this.orderPdfService
				  .getOrderAgreementPdf(this.orderID)
				  .then((pdfContent: any) => {
					  this.blobURL = this.generateBlobUrl(pdfContent);
					  this.wait = false;
				  })
				  .catch(() => {
					  console.log("could not get pdf");
				  });
			  }
		  );
  }

	private generateBlobUrl(pdfContent: any): string {
		const byteCharacters = atob(pdfContent);
		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteNumbers.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}

		const blob = new Blob([new Uint8Array(byteNumbers)], {
			type: "application/pdf",
		});

		return URL.createObjectURL(blob);
	}
	public openAgreement() {
	  window.open(this.blobURL);
	}

}
