import {ActivatedRoute} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable,Observer} from 'rxjs';
import {share} from 'rxjs/operators';
import {GlobalPurposeService} from './globalpurposeservice';

@Injectable()
export class RouteParamsService {

	pageStart: number;
	pageLimit: number;
	pageSort: number;
	brandName: string;
	searchPhraze: string;

	navChange$: Observable<any>;
  	private _observer: Observer<any>;

	constructor(private route: ActivatedRoute, private globalPurposeService: GlobalPurposeService) {

		this.globalPurposeService.jsHelper.logOperation('RouteParamsService constructor');

		this.pageStart = this.globalPurposeService.jsHelper.defaultUrlQuery.pageStart;
		this.pageLimit = this.globalPurposeService.jsHelper.defaultUrlQuery.pageLimit;
		this.pageSort = this.globalPurposeService.jsHelper.defaultUrlQuery.pageSort;
		this.brandName = this.globalPurposeService.jsHelper.defaultUrlQuery.brandName;
		this.searchPhraze = this.globalPurposeService.jsHelper.defaultUrlQuery.searchPhraze;

		this.navChange$ = new Observable((observer:any) =>
		      this._observer = observer).pipe(share());
	}

	updateParams(params:any) {
			this.globalPurposeService.jsHelper.logOperation('RouteParamsService catched route change');
			this.brandName = params['brandName'] || this.globalPurposeService.jsHelper.defaultUrlQuery.brandName;
			this.pageSort = +params['pageSort'] || this.globalPurposeService.jsHelper.defaultUrlQuery.pageSort;
			this.searchPhraze = params['searchPhraze'] || this.globalPurposeService.jsHelper.defaultUrlQuery.searchPhraze;
			this.pageStart = parseInt(+params['pageStart'] || this.globalPurposeService.jsHelper.defaultUrlQuery.pageStart, 0);
			this.pageLimit = parseInt(+params['pageLimit'] || this.globalPurposeService.jsHelper.getItemsPerPage(), 0);

			if(this._observer !== undefined)
				this._observer.next(params);
	} 
}
