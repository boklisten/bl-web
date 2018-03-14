import {Component, OnInit} from '@angular/core';
import {CartService} from "./cart.service";
import {BlApiError, Branch, CustomerItem, Item, Order, OrderItem, Payment, UserDetail} from "bl-model";
import {BranchService, CustomerItemService, ItemService, OrderService} from "bl-connect";
import {BranchStoreService} from "../branch/branch-store.service";
import {UserService} from "../user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BL_CONFIG} from "bl-connect/bl-connect/bl-config";
import {PaymentService} from "bl-connect";

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
	public showPrice: boolean;
	public warningMsg: string;
	private userNotLoggedInMsg: string;
	
	public loginUrl: string;
	public registerUrl: string;
	public loginButtonText: string;
	public registerButtonText: string;
	
	constructor(private _cartService: CartService, private _branchService: BranchService, private _itemService: ItemService,
				private _branchStoreService: BranchStoreService, private _userService: UserService, private _orderService: OrderService,
				private _router: Router, private _route: ActivatedRoute, private _customerItemService: CustomerItemService,
				private _paymentService: PaymentService) {
		
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
		
		const order = this._cartService.createOrder();
		
		
		
		
		
		this._orderService.add(order).then((addedOrder: Order) => {
			
			const payment: any = {
				method: "dibs",
				order: addedOrder.id,
				info: {},
				amount: order.amount,
				confirmed: false,
				customer: this._userService.getUserDetailId(),
				branch: this._branchStoreService.getCurrentBranch().id
			};
			
			this._paymentService.add(payment).then((addedPayment: Payment) => {
				console.log('we added a payment and waiting for confirmation', addedPayment);
			}).catch(() => {
				console.log('could not add payment');
			});
			
			
			
		}).catch((blApiErr: BlApiError) => {
			console.log('the api err', blApiErr);
		});
		
		
		
		/*
		this._branchService.getById("5a1d67cdf14cbe78ff047d00").then((branch: Branch) => {
			this._branchStoreService.setCurrentBranch(branch);
			this._userService.getUserDetail().then((userDetail: UserDetail) => {
				this._customerItemService.getManyByIds(userDetail.customerItems).then((customerItems: CustomerItem[]) => {
					for (const customerItem of customerItems) {
						this._itemService.getById(customerItem.item).then((item: Item) => {
							
							this._cartService.addCustomerItemExtend(customerItem, item, this._branchStoreService.getCurrentBranch());
							
						}).catch(() => {
							console.log('could not get items');
						});
					}
				});
			}).catch(() => {
				console.log('could not get customerItems');
			});
		}).catch(() => {
			console.log('could not get branch');
		});
		*/
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
	
	public onPayment() {
		this.warningMsg = '';
		
		if (!this._userService.loggedIn()) {
			this.setWarning(this.userNotLoggedInMsg);
			return;
		}
		
		let order = this._cartService.createOrder();
		this._cartService.emptyCart();
		console.log('the order is like this: ', order);
		
		this._orderService.add(order).then((apiOrder: Order) => {
			console.log('we got the order back from api!', apiOrder);
			this._router.navigateByUrl('/u/order');
		}).catch((apiError: BlApiError) => {
			console.log('we got an error from api', apiError);
		});
	}
	
}
