import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlApiError, Delivery, Order, DeliveryMethod} from "bl-model";
import {DateService} from "../../date/date.service";
import {DeliveryService} from 'bl-connect';

@Component({
	selector: 'app-cart-delivery',
	templateUrl: './cart-delivery.component.html',
	styleUrls: ['./cart-delivery.component.scss']
})
export class CartDeliveryComponent implements OnInit {
	
	
	@Output() delivery: EventEmitter<Delivery>;
	@Input() order: Order;
	
	public deliveryMethod: DeliveryMethod;
	public currentDelivery: Delivery;
	
	
	constructor(private _deliveryService: DeliveryService, private _dateService: DateService) {
		this.deliveryMethod = 'branch';
		this.delivery = new EventEmitter();
	}
	
	ngOnInit() {
	}
	
	onDeliveryClick(deliveryMethod: DeliveryMethod) {
		this.deliveryMethod = deliveryMethod;
		console.log('the clicked method', deliveryMethod);
		if (deliveryMethod === 'bring') {
			this.fetchDeliveryInfoBring().then((delivery: Delivery) => {
				console.log('we got delivery!::::::', delivery);
				delivery.amount = delivery.info['amount']; // fix this in API!
				this.currentDelivery = delivery;
				
				this.delivery.emit(delivery);
				
			}).catch((blApiErr: BlApiError) => {
				console.log('could not get delivery..', blApiErr);
			});
		} else {
			const defaultDelivery: Delivery = {
				id: '',
				amount: 0,
				method: 'branch',
				info: {
					branch: 'branch1'
				},
				order: this.order.id
			};
			this.delivery.emit(defaultDelivery);
		}
	}
	
	public getEstimatedDelivery(): string {
		if (!this.currentDelivery) {
			return '';
		}
		return this._dateService.daysUntil(this.currentDelivery.info['estimatedDelivery']);
	}
	
	private fetchDeliveryInfoBring(): Promise<Delivery> {
		return new Promise((resolve, reject) => {
			this._deliveryService.add(this.createDelivery()).then((delivery: Delivery) => {
				resolve(delivery);
			}).catch((blApiErr: BlApiError) => {
				reject(blApiErr);
			});
		});
	}
	
	private createDelivery(): Delivery {
		const delivery: Delivery = {
			id: '',
			method: this.deliveryMethod,
			info: {
				branch: 'branch2'
			},
			order: this.order.id,
			amount: 0
		};
		
		return delivery;
	}
	
	
	
	
	
	
}
