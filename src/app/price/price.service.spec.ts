import {TestBed, inject} from '@angular/core/testing';

import {PriceService} from './price.service';
import {Injectable} from "@angular/core";
import {BranchStoreService} from "../branch/branch-store.service";

@Injectable()
class BranchStoreStubService {

}

describe('PriceService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				PriceService,
				{provide: BranchStoreService, useValue: new BranchStoreStubService()}
			]
		});
	});

	it('should be created', inject([PriceService], (service: PriceService) => {
		expect(service).toBeTruthy();
	}));
});
