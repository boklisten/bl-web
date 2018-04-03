import {Component, OnInit} from '@angular/core';
import {CartService} from "./cart.service";
import {BlApiError, Branch, CustomerItem, Item, Order, OrderItem, Payment, UserDetail} from "bl-model";
import {BranchService, CustomerItemService, ItemService, OrderService} from "bl-connect";
import {BranchStoreService} from "../branch/branch-store.service";
import {UserService} from "../user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BL_CONFIG} from "bl-connect/bl-connect/bl-config";
import {PaymentService} from "bl-connect";
import {CartOrderService} from "./order/cart-order.service";

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
	public showPrice: boolean;
	public warningMsg: string;
	private userNotLoggedInMsg: string;
	public order: Order;
	
	public loginUrl: string;
	public registerUrl: string;
	public loginButtonText: string;
	public registerButtonText: string;
	
	constructor(private _cartService: CartService, private _branchService: BranchService, private _itemService: ItemService,
				private _branchStoreService: BranchStoreService, private _userService: UserService, private _orderService: OrderService,
				private _router: Router, private _route: ActivatedRoute, private _customerItemService: CustomerItemService,
				private _paymentService: PaymentService, private _cartOrderService: CartOrderService) {
		
		this.userNotLoggedInMsg = 'You must login to order items';
		this.loginUrl = '/auth/login';
		this.registerUrl = '/auth/register';
		this.loginButtonText = 'Login';
		this.registerButtonText = 'Register';
	
	}
	
	ngOnInit() {
		if (this._cartService.isEmpty()) {
			return;
		}
		
		if (!this._branchStoreService.getBranch()) {
			this._branchService.get().then((branches: Branch[]) => {
				this._branchStoreService.setCurrentBranch(branches[0]);
			}).catch(() => {
				console.log('TEST cartService: could not get branches');
			});
		}
	}
	
	public showCart(): boolean {
		return (this.getCart().length > 0);
	}
	
	public getCart(): {item: Item, orderItem: OrderItem}[] {
		return this._cartService.getCart();
	}
	
	public onRemove(itemId: string) {
		this._cartService.remove(itemId);
	}
	
	public getTotalPrice(): number {
		return this._cartService.getTotalPrice();
	}
	
	public setWarning(msg: string) {
		this.warningMsg = msg;
	}
}
