import { Component, OnInit } from "@angular/core";
import { CartService } from "../cart/cart.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
	BranchItemService,
	BranchService,
	CustomerItemService,
	ItemService,
} from "@boklisten/bl-connect";
import { BranchStoreService } from "../branch/branch-store.service";

interface CartAction {
	customerItemId: string;
	action: "extend" | "buyout";
}
// http://localhost:4200/cart/receive?cart_actions=[{"customerItemId":"680b73211d3348a6b1550e80","action":"extend"}]

@Component({
	selector: "app-cart-receiver",
	templateUrl: "./cart-receiver.component.html",
})
export class CartReceiverComponent implements OnInit {
	cartError = false;

	constructor(
		private cartService: CartService,
		private customerItemService: CustomerItemService,
		private branchItemService: BranchItemService,
		private itemService: ItemService,
		private branchService: BranchService,
		private branchStoreService: BranchStoreService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.cartService.clearCart();
		this.route.queryParams.subscribe(async (params) => {
			try {
				const cartActions = JSON.parse(
					params["cart_actions"]
				) as CartAction[];
				for (const cartAction of cartActions) {
					const customerItem = await this.customerItemService.getById(
						cartAction.customerItemId
					);
					const branchItems = await this.branchItemService.get({
						query:
							"?branch=" + customerItem.handoutInfo.handoutById,
					});
					const branchItem = branchItems.find(
						(bi) => bi.item === customerItem.item
					);

					const item = await this.itemService.getById(
						customerItem.item
					);
					const branch = await this.branchService.getById(
						customerItem.handoutInfo.handoutById
					);
					await this.branchStoreService.setBranch(branch);
					if (cartAction.action == "buyout") {
						this.cartService.addCustomerItemBuyout(
							customerItem,
							branchItem,
							item,
							branch
						);
						continue;
					}

					if (cartAction.action == "extend") {
						this.cartService.addCustomerItemExtend(
							customerItem,
							item,
							branchItem,
							branch
						);
						continue;
					}
				}
				this.router.navigate([`/cart/checkout`], {
					replaceUrl: true,
					queryParams: {
						caller: params["caller"],
					},
				});
			} catch (error) {
				console.error(error);
				this.cartError = true;
			}
		});
	}
}
