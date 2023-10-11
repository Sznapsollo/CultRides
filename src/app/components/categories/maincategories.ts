import {Component} from '@angular/core';
//import 'rxjs/add/operator/debounceTime';
import {RouteParamsService} from '../../services/routeparamsservice';
import {MainCategoryItem, MainCategoriesService} from '../../services/maincategoriesservice';
import {GlobalPurposeService} from '../../services/globalpurposeservice';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'main-categories',
  templateUrl: './maincategories.html',
  providers: [MainCategoriesService],
})

export class MainCategoriesComponent {

	categories: MainCategoryItem[] = [];
	selectedValue:string;

	constructor(private routeParamsService: RouteParamsService, private mainCategoriesService: MainCategoriesService, private router: Router, private globalPurposeService: GlobalPurposeService) {
		this.globalPurposeService.jsHelper.logOperation('MainCategoriesComponent constructor');
	}

	ngOnInit() {
	  this.mainCategoriesService.getData()
		.subscribe({
			next: data => {this.categories = data; this.categories.splice(0,0,{name:'All',cars:0 ,machine_name:'categories'});},
			error: err => console.log(err),
			complete: () => {this.globalPurposeService.jsHelper.logOperation('mainCategoriesService.getData() Complete')}
		});
	}

	applyCategory(event: any) {
		let categoryValue:string = event.target.value;
		this.router.navigate(['/cultrides', this.routeParamsService.pageSort, this.globalPurposeService.jsHelper.defaultUrlQuery.pageStart, this.routeParamsService.pageLimit, this.globalPurposeService.jsHelper.swapUrlZnakForth(categoryValue), this.globalPurposeService.jsHelper.defaultUrlQuery.searchPhraze]);
	}

	updateSelectedValue(value:string) {
		this.selectedValue = value;
	}

	categoryName(category: MainCategoryItem) {
		let name = category.name == 'All' ? 'All Categories' : category.name;
		if(category.name != 'All')
			name = `${name} (${category.cars})`;
		return name;
	}

	isSelectedValue(category: MainCategoryItem) {
		return category.name == this.selectedValue;
	}
}
