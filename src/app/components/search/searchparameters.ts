import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RouteParamsService} from '../../services/routeparamsservice';
import {GlobalPurposeService} from '../../services/globalpurposeservice';

@Component({
  selector: 'search-parameters',
  template: ''
})

export class SearchParametersComponent {

	private sub: any;

	constructor(private routeParamsService: RouteParamsService, private route: ActivatedRoute, private globalPurposeService: GlobalPurposeService) {
		this.globalPurposeService.jsHelper.logOperation('SearchPrametersComponent constructor');
	}

	ngOnInit() {
	  this.sub = this.route.params.subscribe(params => {
	  		this.routeParamsService.updateParams(params);
	  });
	}

	ngOnDestroy() {
	  this.sub.unsubscribe();
	}
}
