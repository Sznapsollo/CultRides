import {Component} from '@angular/core';
import {GlobalPurposeService} from '../../services/globalpurposeservice';

@Component({
  selector: 'page-footer',
  styleUrls: ['./footer.css'],
  templateUrl: './footer.html'
})
export class FooterComponent {

	constructor(private globalPurposeService: GlobalPurposeService) {
		this.globalPurposeService.jsHelper.logOperation('FooterComponent constructor');
	}
}
