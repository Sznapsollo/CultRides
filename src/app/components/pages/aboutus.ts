import {Component} from '@angular/core';
import {GlobalPurposeService} from '../../services/globalpurposeservice';

@Component({
  templateUrl: './aboutus.html',
  selector: 'aboutus-page',
})

export class AboutUsComponent {

	constructor(private globalPurposeService: GlobalPurposeService) {
		this.globalPurposeService.jsHelper.logOperation('AboutUsComponent constructor');
	}
	
	ngAfterViewInit() {
		this.globalPurposeService.showInitiallyHidden();
	}
}
