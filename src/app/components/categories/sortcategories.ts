import {Component} from '@angular/core';
//import 'rxjs/add/operator/debounceTime';
import {RouteParamsService} from '../../services/routeparamsservice';
import {GlobalPurposeService} from '../../services/globalpurposeservice';
import {Router} from '@angular/router';

@Component({
  selector: 'sort-categories',
  templateUrl: './sortcategories.html',
})

export class SortCategoriesComponent {

	sorties: any[];
	selectedValue:number;

	constructor(private routeParamsService: RouteParamsService, private router: Router, private globalPurposeService: GlobalPurposeService) {
		this.sorties = this.globalPurposeService.jsHelper.sortValues;
		this.globalPurposeService.jsHelper.logOperation('SortCategoriesComponent constructor');
	}

	applySort(event: any) {
		let sortValue:string = event.target.value;
		this.router.navigate(['/cultrides', sortValue, this.routeParamsService.pageStart, this.routeParamsService.pageLimit, this.routeParamsService.brandName, this.routeParamsService.searchPhraze]);
	}

	updateSelectedValue(value:number) {
		this.selectedValue = value;
	}
}
