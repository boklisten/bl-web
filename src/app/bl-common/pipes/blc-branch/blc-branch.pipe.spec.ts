import {BlcBranchPipe} from './blc-branch.pipe';
import {BranchService} from "@wizardcoder/bl-connect";

describe('BlcBranchPipe', () => {
	it('create an instance', () => {
		const pipe = new BlcBranchPipe({} as BranchService);
		expect(pipe).toBeTruthy();
	});
});
