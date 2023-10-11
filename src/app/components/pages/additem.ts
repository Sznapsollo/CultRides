import {Component} from '@angular/core';
import {GlobalPurposeService} from '../../services/globalpurposeservice';

@Component({
  templateUrl: './additem.html',
  selector: 'additem-page',
})

export class AddItemComponent {

	itemId: number = 1;

	constructor(private globalPurposeService: GlobalPurposeService) {
		this.globalPurposeService.jsHelper.logOperation('AddItemComponent constructor');
	}
	
	ngAfterViewInit() {
		this.globalPurposeService.showInitiallyHidden();
	}
}
