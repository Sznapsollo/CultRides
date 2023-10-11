import {Component, Input} from '@angular/core';
import {Item} from '../../services/itemservice';
import {RouteParamsService} from '../../services/routeparamsservice';
import {GlobalPurposeService} from '../../services/globalpurposeservice';
import {Router} from '@angular/router';

@Component({
  selector: 'item-min',
  styleUrls: ['./itemmin.css'],
  templateUrl: './itemmin.html',
})

export class ItemMinComponent {

	@Input() item: Item;
	@Input() fullView: boolean;
	@Input() moreInfo: boolean;

	constructor(private routeParamsService: RouteParamsService, private router: Router, private globalPurposeService: GlobalPurposeService) {
		this.globalPurposeService.jsHelper.logOperation('ItemMinComponent constructor');
	}

	goToCategoryPage(categoryValue: string) {
		this.router.navigate(['/cultrides', this.routeParamsService.pageSort, this.globalPurposeService.jsHelper.defaultUrlQuery.pageStart, this.routeParamsService.pageLimit, categoryValue, this.globalPurposeService.jsHelper.defaultUrlQuery.searchPhraze]);
	}

	goToCultRide(id:number) {
		this.router.navigate(['/cultride', id]);
	}
}
