import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MainApplicationService} from "../../services/mainapplicationservice";
import {GlobalPurposeService} from '../../services/globalpurposeservice';

@Component({
  selector: 'main-application',
  templateUrl: './application.html',
  providers: [MainApplicationService]
})
export class ApplicationComponent {

	randomItemId: number;
	redirectingToRandom: boolean = false;

	constructor(private mainApplicationService: MainApplicationService, private router: Router, private globalPurposeService: GlobalPurposeService) {
	 	this.globalPurposeService.jsHelper.logOperation('ApplicationComponent constructor');
	}

	randomItem() {
		this.mainApplicationService.redirectToRandomItem();
	}

	ngAfterViewInit() {
		this.globalPurposeService.jsHelper.topResize();
		this.globalPurposeService.jsHelper.initiateBannerAnimations();
		this.globalPurposeService.jsHelper.crankBannerUp();
		// on small screen devices dont pop search on start
        if(window.innerWidth >= 450) {
			setTimeout(() => {
				this.globalPurposeService.jsHelper.toggleSearchSection();
			},1000);
        }
	}

	getIfElse(path:string,trueValue:string,elseValue:string) {
		if (this.router.url == path) {
		  	return trueValue;
		}
		else if (path.length > 2 && this.router.url.indexOf(path) >= 0) {
		  	return trueValue;
		} 
		else {
		  	return elseValue;
		}
	}

	 /*
	 ngOnInit() {
	    console.log('AppComponent initialized', this);
	  }
	  ngAfterViewInit() {
	    console.log('AppComponent view initialized', this);
	  }
	  */
}
