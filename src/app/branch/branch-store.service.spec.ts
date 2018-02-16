import {TestBed, inject} from '@angular/core/testing';

import {BranchStoreService} from './branch-store.service';

describe('BranchService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [BranchStoreService]
		});
	});
	
	it('should be created', inject([BranchStoreService], (service: BranchStoreService) => {
		expect(service).toBeTruthy();
	}));
});
