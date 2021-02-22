import { TestBed, inject } from "@angular/core/testing";

import { PriceService } from "./price.service";
import { Injectable } from "@angular/core";
import { BranchStoreService } from "../branch/branch-store.service";
import { Branch, Item } from "@boklisten/bl-model";

@Injectable()
class BranchStoreStubService {}

describe("PriceService", () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				PriceService,
				{
					provide: BranchStoreService,
					useValue: new BranchStoreStubService(),
				},
			],
		});
	});

	it("should be created", inject([PriceService], (service: PriceService) => {
		expect(service).toBeTruthy();
	}));

	describe("#calculateOrderItemUnitPrice", () => {
		let testBranch: any;
		let testItem: any;

		beforeEach(() => {
			testBranch = {
				paymentInfo: {
					responsible: false,
					rentPeriods: [
						{
							type: "semester",
							percentage: 0.5,
						},
					],
				},
			};

			testItem = {
				price: 100,
			};
		});

		describe("when orderItem.type is rent", () => {
			let testOrderItem;

			beforeEach(() => {
				testOrderItem = {
					type: "rent",
					info: {
						periodType: "semester",
					},
				};
			});

			it("should return correct unitPrice", inject(
				[PriceService],
				(service: PriceService) => {
					testItem.price = 460;
					testBranch.paymentInfo.rentPeriods[0].percentage = 0.33;
					expect(
						service.calculateOrderItemUnitPrice(
							testOrderItem,
							testItem as Item,
							testBranch as Branch
						)
					).toBe(150); // the real value should be 151.8, but since we are rounding down it should be 150

					testItem.price = 666;
					testBranch.paymentInfo.rentPeriods[0].percentage = 0.67;
					expect(
						service.calculateOrderItemUnitPrice(
							testOrderItem,
							testItem as Item,
							testBranch as Branch
						)
					).toBe(440); // the real value should be 446,22, but since we are rounding down it should be 440

					testItem.price = 124;
					testBranch.paymentInfo.responsible = true;
					expect(
						service.calculateOrderItemUnitPrice(
							testOrderItem,
							testItem as Item,
							testBranch as Branch
						)
					).toBe(0); // since the branch is responsible, the user does not need to pay anything
				}
			));
		});

		describe("when orderItem.type is buy", () => {
			let testOrderItem;
			beforeEach(() => {
				testOrderItem = {
					type: "buy",
				};
			});

			it("should return correct unitPrice", inject(
				[PriceService],
				(service: PriceService) => {
					testItem.price = 460;
					expect(
						service.calculateOrderItemUnitPrice(
							testOrderItem,
							testItem,
							testBranch
						)
					).toBe(460);

					testItem.price = 188;
					expect(
						service.calculateOrderItemUnitPrice(
							testOrderItem,
							testItem,
							testBranch
						)
					).toBe(180); // the price should be rounded down to nearest 10

					testItem.price = -188;
					expect(
						service.calculateOrderItemUnitPrice(
							testOrderItem,
							testItem,
							testBranch
						)
					).toBe(-188);
				}
			));
		});
	});

	describe("#calculateOrderItemTaxAmount", () => {
		it("should return correct taxAmount", inject(
			[PriceService],
			(service: PriceService) => {
				expect(service.calculateOrderItemTaxAmount(100, 0.25)).toBe(25);
				expect(service.calculateOrderItemTaxAmount(500, 0.53)).toBe(
					265
				);
				expect(service.calculateOrderItemTaxAmount(0, 0.66)).toBe(0);
				expect(service.calculateOrderItemTaxAmount(-100, 0.22)).toBe(0);
				expect(service.calculateOrderItemTaxAmount(300, 0)).toBe(0);
			}
		));
	});

	describe("#calculateOrderItemAmount", () => {
		it("should return correct amount", inject(
			[PriceService],
			(service: PriceService) => {
				expect(service.calculateOrderItemAmount(100, 30)).toBe(130);
				expect(service.calculateOrderItemAmount(520, 100)).toBe(620);
				expect(service.calculateOrderItemAmount(124, 0)).toBe(124);
				expect(service.calculateOrderItemAmount(-400, 0)).toBe(-400);
				expect(service.calculateOrderItemAmount(323.6, 0)).toBe(323.6);
			}
		));
	});

	describe("#calculateOrderItemPrices", () => {
		it("should return correct prices", inject(
			[PriceService],
			(service: PriceService) => {
				expect(service.calculateOrderItemPrices(100, 0.25)).toEqual({
					amount: 125,
					unitPrice: 100,
					taxRate: 0.25,
					taxAmount: 25,
				});

				expect(service.calculateOrderItemPrices(500, 0)).toEqual({
					amount: 500,
					unitPrice: 500,
					taxRate: 0,
					taxAmount: 0,
				});

				expect(service.calculateOrderItemPrices(60, 0.1)).toEqual({
					amount: 66,
					unitPrice: 60,
					taxRate: 0.1,
					taxAmount: 6,
				});

				expect(
					service.calculateOrderItemPrices(8329.178, 0.62)
				).toEqual({
					amount: 13493.27,
					unitPrice: 8329.18,
					taxRate: 0.62,
					taxAmount: 5164.09,
				});
			}
		));
	});
});
