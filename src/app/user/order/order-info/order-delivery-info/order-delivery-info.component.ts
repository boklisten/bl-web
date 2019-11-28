import { Component, Input, OnInit } from "@angular/core";
import { Delivery, Order } from "@wizardcoder/bl-model";
import { DeliveryService } from "@wizardcoder/bl-connect";
import { Router } from "@angular/router";

@Component({
	selector: "app-order-delivery-info",
	templateUrl: "./order-delivery-info.component.html",
	styleUrls: ["./order-delivery-info.component.scss"]
})
export class OrderDeliveryInfoComponent implements OnInit {
	@Input() order: Order;
	public delivery: Delivery;

	constructor(
		private _deliveryService: DeliveryService,
		private _router: Router
	) {}

	ngOnInit() {
		if (this.order && this.order.delivery) {
			this._deliveryService
				.getById(this.order.delivery as string)
				.then((delivery: Delivery) => {
					this.delivery = delivery;
				})
				.catch(getDeliveryError => {
					console.log(
						"orderDeliveryInfoComponent: could not get delivery",
						getDeliveryError
					);
				});
		}
	}

	public onClickShowDeliveryAtBring() {
		window.open(
			"https://sporing.bring.no/sporing.html?q=" +
				this.delivery.info["trackingNumber"]
		);
	}

	private onBranchInfoClick() {
		this._router.navigateByUrl(
			"/info/branch/" + this.delivery.info["branch"]
		);
	}
}
