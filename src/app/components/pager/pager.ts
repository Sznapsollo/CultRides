import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {RouteParamsService} from '../../services/routeparamsservice';
import {GlobalPurposeService} from '../../services/globalpurposeservice';

@Component({
  selector: 'items-pager',
  styleUrls: ['./pager.css'],
  templateUrl: './pager.html',
})
export class PagerComponent {
	
	@Input() allCount: number;

	pages: number[];
	itemsPerPageArray: number[] = [4,8,16,24];
	selectedPage: number = 0;
	totalItems: number = 0;
	previousNode:number;
	nextNode:number;
	lastNode:number;
	firstNode:number;

	constructor(private router: Router, public routeParamsService: RouteParamsService, private globalPurposeService: GlobalPurposeService) {
		this.globalPurposeService.jsHelper.logOperation('ItemsPagerComponent constructor');
	}

	goNext():void {
		this.router.navigate(['/cultrides', this.routeParamsService.pageSort, this.nextNode, this.routeParamsService.pageLimit, this.routeParamsService.brandName, this.routeParamsService.searchPhraze]);
		this.globalPurposeService.jsHelper.scrollTop();
	}

	goLast() {
		this.router.navigate(['/cultrides', this.routeParamsService.pageSort, this.lastNode, this.routeParamsService.pageLimit, this.routeParamsService.brandName, this.routeParamsService.searchPhraze]);
		this.globalPurposeService.jsHelper.scrollTop();
	}

	goPrevious() {
		this.router.navigate(['/cultrides', this.routeParamsService.pageSort, this.previousNode, this.routeParamsService.pageLimit, this.routeParamsService.brandName, this.routeParamsService.searchPhraze]);
		this.globalPurposeService.jsHelper.scrollTop();
	}

	goFirst() {
		this.router.navigate(['/cultrides', this.routeParamsService.pageSort, this.firstNode, this.routeParamsService.pageLimit, this.routeParamsService.brandName, this.routeParamsService.searchPhraze]);
		this.globalPurposeService.jsHelper.scrollTop();
	}

	get canGoBack(): boolean {
	    return this.routeParamsService.pageStart > 0;
	}

	get canGoNext(): boolean {
	    return this.routeParamsService.pageStart + this.routeParamsService.pageLimit < this.totalItems;
	}

	ngOnChanges() {
		this.preparePager();
	}

	get pageLimit(): number {
		return this.routeParamsService.pageLimit;
	}

	preparePager() {

		this.globalPurposeService.jsHelper.logOperation('ItemsPagerComponent preparePager');
		this.pages = [];

		this.totalItems = this.allCount, 0;
		
		if(this.routeParamsService.pageLimit <= 0)
			this.routeParamsService.pageLimit = this.globalPurposeService.jsHelper.getItemsPerPage();
		
		this.selectedPage = this.routeParamsService.pageStart/this.routeParamsService.pageLimit;
		
		var pagesNumber = this.totalItems/this.routeParamsService.pageLimit;
		
		for (var i = 0; i < pagesNumber; i++) { 
			this.pages.push(i);
		}
		
		if(this.routeParamsService.pageStart > 0)
		{
			this.firstNode = 0;

			this.previousNode = this.routeParamsService.pageStart - this.routeParamsService.pageLimit > 0 ? this.routeParamsService.pageStart - this.routeParamsService.pageLimit : 0;
		}	
		
		if(this.routeParamsService.pageStart + this.routeParamsService.pageLimit < this.totalItems)
		{
			this.nextNode = this.routeParamsService.pageStart + this.routeParamsService.pageLimit;
			
			this.lastNode = this.totalItems - this.routeParamsService.pageLimit;
			var itemsRound = this.globalPurposeService.jsHelper.getItemsPerPage()+2;
			
			for(var i=0; i<=itemsRound; i++)
			{
				var calculate = this.totalItems - this.routeParamsService.pageLimit + i;
				if(calculate % this.globalPurposeService.jsHelper.getItemsPerPage() == 0)
				{
					this.lastNode = calculate;
					break;
				}
			}
			
		}
    }

	onInputEvent(event: any): void {
    	let inputElement = event.target;
    	this.globalPurposeService.jsHelper.setLocalStorage("itemsPerPage", inputElement.value);
    	this.router.navigate(['/cultrides', this.routeParamsService.pageSort, 0, inputElement.value, this.routeParamsService.brandName, this.routeParamsService.searchPhraze]);
    }

    updateSelectedPage(event: any): void {
		let inputElement = event.target;
		this.selectedPage = inputElement.value;
		this.router.navigate(['/cultrides', this.routeParamsService.pageSort, this.selectedPage * this.routeParamsService.pageLimit, this.globalPurposeService.jsHelper.getItemsPerPage(), this.routeParamsService.brandName, this.routeParamsService.searchPhraze]);
	}


}
