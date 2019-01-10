import { TestBed, inject } from "@angular/core/testing";
import { CartOrderService } from "../cart-order/cart-order.service";
import { CartService } from "../cart.service";
import { BranchStoreService } from "../../branch/branch-store.service";
import { CartDeliveryService } from "../cart-delivery/cart-delivery.service";
import { CartOrderCheckoutService } from "./cart-order-checkout.service";
import { CartStep } from "./cart-step";
import { Subject } from "rxjs";

describe("CartOrderCheckoutService", () => {
	let service: CartOrderCheckoutService;
	let cartOrderServiceSpy: jasmine.SpyObj<CartOrderService>;
	let cartServiceSpy: jasmine.SpyObj<CartService>;
	let cartDeliveryServiceSpy: jasmine.SpyObj<CartDeliveryService>;
	let branchStoreServiceSpy: jasmine.SpyObj<BranchStoreService>;

	beforeEach(() => {
		const cartOrderServiceJasmineSpy = jasmine.createSpyObj(
			"CartOrderService",
			[
				"doesOrderIncludeBuy",
				"doesOrderIncludeExtend",
				"doesOrderIncludeRent",
				"doesOrderIncludeBuyout",
				"onOrderChange"
			]
		);
		const cartServiceJasmineSpy = jasmine.createSpyObj("CartService", [
			"isOnlyCustomerItems",
			"shouldPay",
			"onCartChange",
			"getSize"
		]);
		const cartDeliveryServiceJasmineSpy = jasmine.createSpyObj(
			"CartDeliveryService",
			["getDelivery"]
		);
		const branchStoreServiceJasmineSpy = jasmine.createSpyObj(
			"BranchStoreService",
			["getBranch"]
		);

		TestBed.configureTestingModule({
			providers: [
				CartOrderCheckoutService,
				{
					provide: CartOrderService,
					useValue: cartOrderServiceJasmineSpy
				},
				{ provide: CartService, useValue: cartServiceJasmineSpy },
				{
					provide: CartDeliveryService,
					useValue: cartDeliveryServiceJasmineSpy
				},
				{
					provide: BranchStoreService,
					useValue: branchStoreServiceJasmineSpy
				}
			]
		});

		cartOrderServiceSpy = TestBed.get(CartOrderService);
		cartServiceSpy = TestBed.get(CartService);
		cartDeliveryServiceSpy = TestBed.get(CartDeliveryService);
		branchStoreServiceSpy = TestBed.get(BranchStoreService);
		service = TestBed.get(CartOrderCheckoutService);

		cartOrderServiceSpy.onOrderChange.and.returnValue(
			new Subject().asObservable().subscribe
		);

		cartServiceSpy.getSize.and.returnValue(1);
	});

	it("should be created", inject(
		[CartOrderCheckoutService],
		(service: CartOrderCheckoutService) => {
			expect(service).toBeTruthy();
		}
	));

	describe("#calculateCartSteps", () => {
		describe("when branch is responsibe", () => {
			it('should return "agreement" and "checkout" if no orderItems is of type "buy", "buyout" or "extend"', () => {
				branchStoreServiceSpy.getBranch.and.returnValue({
					paymentInfo: { responsible: true }
				});
				cartOrderServiceSpy.doesOrderIncludeBuy.and.returnValue(false);
				cartOrderServiceSpy.doesOrderIncludeBuyout.and.returnValue(
					false
				);
				cartOrderServiceSpy.doesOrderIncludeExtend.and.returnValue(
					false
				);
				cartOrderServiceSpy.doesOrderIncludeRent.and.returnValue(true);

				const expectedSteps: CartStep[] = [
					{
						type: "agreement",
						confirmed: false
					},
					{
						type: "checkout",
						confirmed: false
					}
				];
				expect(service.calculateCartSteps()).toEqual(expectedSteps);
			});

			it('should return "payment" if all orderItems is of type "buyout" and or "extend"', () => {
				branchStoreServiceSpy.getBranch.and.returnValue({
					paymentInfo: { responsible: true }
				});

				cartOrderServiceSpy.doesOrderIncludeBuy.and.returnValue(false);
				cartOrderServiceSpy.doesOrderIncludeBuyout.and.returnValue(
					true
				);
				cartOrderServiceSpy.doesOrderIncludeExtend.and.returnValue(
					true
				);
				cartOrderServiceSpy.doesOrderIncludeRent.and.returnValue(false);

				const expectedSteps: CartStep[] = [
					{
						type: "payment",
						confirmed: false
					}
				];

				expect(service.calculateCartSteps()).toEqual(expectedSteps);
			});
		});

		describe("when branch is not responsible", () => {
			it('should return "agreement", "delivery" and "payment" if some orderItems is of type "rent"', () => {
				const expectedSteps: CartStep[] = [
					{
						type: "agreement",
						confirmed: false
					},
					{
						type: "delivery",
						confirmed: false
					},
					{
						type: "payment",
						confirmed: false
					}
				];

				cartOrderServiceSpy.doesOrderIncludeRent.and.returnValue(true);
				branchStoreServiceSpy.getBranch.and.returnValue({
					paymentInfo: { responsible: false }
				});

				expect(service.calculateCartSteps()).toEqual(expectedSteps);
			});

			it('should not include "delivery" if none of the orderItems is of type "rent" or "buy"', () => {
				cartOrderServiceSpy.doesOrderIncludeBuy.and.returnValue(false);
				cartOrderServiceSpy.doesOrderIncludeRent.and.returnValue(false);
				cartOrderServiceSpy.doesOrderIncludeExtend.and.returnValue(
					true
				);

				let deliveryCartStep: CartStep = {
					type: "delivery",
					confirmed: false
				};
				expect(
					service.calculateCartSteps().indexOf(deliveryCartStep) >= 0
				).toBeFalsy();
			});
		});

		it('should not include "agreement" if none of the orderItems is of type "rent"', () => {
			cartOrderServiceSpy.doesOrderIncludeRent.and.returnValue(false);

			let agreementCartStep: CartStep = {
				type: "agreement",
				confirmed: false
			};

			expect(
				service.calculateCartSteps().indexOf(agreementCartStep) >= 0
			).toBeFalsy();
		});
	});
});
