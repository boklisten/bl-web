import {Component, Input} from "@angular/core";


@Component({selector: 'fa-icon', template: ''})
export class FaIconStubComponent {
	@Input() icon: any;
	@Input() size: any;
	@Input() spin: any;
}
