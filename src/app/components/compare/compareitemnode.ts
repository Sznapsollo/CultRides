import {Component} from '@angular/core';
import {GlobalPurposeService} from '../../services/globalpurposeservice';

@Component({
	styleUrls: ['./compareitemnode.css'],
	templateUrl: './compareitemnode.html',
	selector: 'compare-item-node'

})

export class CompareItemNodeComponent {

	addAnotherCompareItem: boolean = false;
	deleteItem: boolean = false;
	activeCompareItem: boolean = true;

	constructor(private globalPurposeService: GlobalPurposeService) {
		this.globalPurposeService.jsHelper.logOperation('CompareItemNodeComponent constructor');
	}
}
