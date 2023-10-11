import {Component, ViewChild} from '@angular/core';
import {ItemssService} from '../../services/itemsservice';
import {GlobalPurposeService} from '../../services/globalpurposeservice';
import {Item} from '../../services/itemservice';
import {ActivatedRoute} from '@angular/router';
import {PagerComponent} from "../pager/pager";
import {Observable} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'search-component',
  providers: [ItemssService],
  styleUrls: ['../home/home.css'],
  templateUrl: './search.html',
})

export class SearchComponent {

	items: Item[];
	count: number = 0;
	startQuery: number;
	limitQuery: number;
	dataLoading: boolean = true;
	_showNoResults: boolean = false;

	private sub: any;

	@ViewChild(PagerComponent, { static: false }) pager: PagerComponent

	constructor(private itemsService: ItemssService, private route: ActivatedRoute, private globalPurposeService: GlobalPurposeService) {
		this.limitQuery = this.globalPurposeService.jsHelper.getItemsPerPage();
		this.limitQuery = this.globalPurposeService.jsHelper.defaultUrlQuery.pageStart;
		this.globalPurposeService.jsHelper.logOperation('SearchComponent constructor');
	}

	ngOnInit() {
	  this.sub = this.route.params.subscribe(params => {

	  	this.globalPurposeService.jsHelper.manageItemsPerPage(+params['pageLimit']);

	    this.itemsService.getData(+params['pageSort'], +params['pageStart'], this.globalPurposeService.jsHelper.getItemsPerPage(), params['brandName'], params['searchPhraze'])
			.subscribe({
				next: (data:any) => {this.items = data.cultRides; this.count = data.count.count; this.startQuery = data.startQuery; this.limitQuery = data.limitQuery},
				error: (err:any) => {this.globalPurposeService.jsHelper.logOperation('SearchComponent itemsService.getData() Error'); console.log(err)},
				complete:() => {this._showNoResults = this.count == 0; this.dataLoading = false; this.updatePager(); this.globalPurposeService.jsHelper.logOperation('SearchComponent itemsService.getData() Complete')}
			});
		 }
		);
	}
	
	ngAfterViewInit() {
		this.globalPurposeService.showInitiallyHidden();
	}

	updatePager() {
		if(this.pager !== undefined) {
			this.pager.preparePager();
		}
	}

	ngOnDestroy() {
	  this.sub.unsubscribe();
	}

	get showNoResults(): boolean {
	    return this._showNoResults;
	}
}
