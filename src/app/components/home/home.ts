import {Component} from '@angular/core';
import {GlobalPurposeService} from '../../services/globalpurposeservice';

@Component({
  selector: 'home-page',
  styleUrls: ['./home.css'],
  templateUrl: './home.html'
})

export class HomeComponent {

	constructor(private globalPurposeService: GlobalPurposeService) {
		this.globalPurposeService.jsHelper.logOperation('HomeComponent constructor');
	}
}
