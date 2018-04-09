import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BranchService, ItemService} from "@wizardcoder/bl-connect";
import {BlApiError, Branch, Item} from "@wizardcoder/bl-model";
import {CartService} from "../../cart/cart.service";

@Component({
	selector: 'app-item-info',
	templateUrl: './item-info.component.html',
	styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {
	public item: Item;
	public branches: Branch[];
	
	constructor(private _route: ActivatedRoute, private _itemService: ItemService, private _cartService: CartService,
				private _branchService: BranchService) {
		this.branches = [];
	}
	
	ngOnInit() {
		const id = this._route.snapshot.paramMap.get('id');
		
		
		this._itemService.getById(id).then((item: Item) => {
			this.item = item;
			this.getBranchNames();
		}).catch((blApiErr: BlApiError) => {
			console.log('itemInfoComponent: could not get items', blApiErr);
		
		});
	}
	
	getBranchNames() {
		this._branchService.get('?og=name&items=' + this.item.id).then((branches: Branch[]) => {
			for (const branch of branches) {
				this.branches.push(branch);
			}
		}).catch((blApiErr: BlApiError) => {
			console.log('itemInfoComponent: could not get the branches', blApiErr);
		});
	}
	
	
	
}
