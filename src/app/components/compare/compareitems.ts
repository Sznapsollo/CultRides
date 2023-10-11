import {Component} from '@angular/core';
import {GlobalPurposeService} from '../../services/globalpurposeservice';

@Component({
	styleUrls: ['./compareitems.css'],
	templateUrl: './compareitems.html',
	selector: 'compare-items-page',
})
export class CompareItemsComponent {

	constructor(private globalPurposeService: GlobalPurposeService) {
		this.globalPurposeService.jsHelper.logOperation('CompareItemsComponent constructor');
	}

	ngAfterViewInit() {
		this.globalPurposeService.showInitiallyHidden();
	}
}
