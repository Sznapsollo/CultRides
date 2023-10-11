import {Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SortCategoriesComponent} from "../categories/sortcategories";
import {MainCategoriesComponent} from "../categories/maincategories";
import {RouteParamsService} from '../../services/routeparamsservice';
import {SearchAutocompleteItem, SearchAutocompleteService} from '../../services/searchautocompleteservice';
import {GlobalPurposeService} from '../../services/globalpurposeservice';
import {Observable} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'search-bar-component',
  styleUrls: ['./searchbar.css'],
  templateUrl: './searchbar.html',
  providers: [SearchAutocompleteService],
})
export class SearchBarComponent {

	searchPlaceholder:string;
	enableAutocomplete:boolean = false;
	searchPhraze: string = '';
	searchBarForm: FormGroup;
	suggestions: SearchAutocompleteItem[];
	dataLoading: boolean = false;

	@ViewChild(SortCategoriesComponent, { static: false }) sortSelector: SortCategoriesComponent;
	@ViewChild(MainCategoriesComponent, { static: false }) categorySelector: MainCategoriesComponent;

	private sub: any;

	constructor(private router: Router, private searchAutocompleteService: SearchAutocompleteService, private routeParamsService: RouteParamsService, private globalPurposeService: GlobalPurposeService, private cdRef:ChangeDetectorRef) {
		this.globalPurposeService.jsHelper.logOperation('SearchBarComponent constructor');

		this.searchBarForm = new FormGroup({
			'searchInput': new FormControl('', [<any>Validators.required, <any>Validators.minLength(3)])
		});
	   	this.searchBarForm.controls['searchInput'].valueChanges
				.pipe(debounceTime(500))
				.subscribe(text =>  
				{
					if(this.searchBarForm.valid && this.enableAutocomplete)
						this.submitInputSearch(text)
					else
						this.stopSuggestions();
					}
				);
	}

	ngOnInit() {
		// this.searchPlaceholder = `Search ...`;
	}

	ngAfterViewInit() {
    this.sub = this.routeParamsService.navChange$.subscribe(params => {
			this.updateSearchLabels(params);
	 });
	 this.updateSearchLabels(null);
  }

	ngOnDestroy() {
	  this.sub.unsubscribe();
	}

	submitSearch() {
		if(!this.searchBarForm.valid)
			return;

		this.suggestions = [];

		this.router.navigate(['/cultrides', this.routeParamsService.pageSort, 0, this.routeParamsService.pageLimit, this.routeParamsService.brandName, this.globalPurposeService.jsHelper.swapUrlZnakForth(this.searchPhraze)]);
	}

	onSubmit() {
		if (this.searchBarForm.valid) {
			this.submitSearch();
		}
	}

	onSearchChange(event: Event): void {  
		const element = event.currentTarget as HTMLInputElement
		this.searchPhraze = element.value;
	}

	submitInputSearch(text: string) {
		if(!this.searchBarForm.valid)
			return;

		this.dataLoading = true;

		this.searchAutocompleteService.getData(this.searchPhraze, this.routeParamsService.brandName)
		.subscribe({
			next: (data:any) => {this.suggestions = data},
			error: (err:any) => {this.globalPurposeService.jsHelper.logOperation('Autosuggestion SearchBarComponent Error');  console.log(err)},
			complete: () => {this.dataLoading = false; this.globalPurposeService.jsHelper.logOperation('SearchBarComponent autosuggestion complete for phraze ', this.searchPhraze)}
		});
	}

	stopSuggestions() {
		setTimeout(() => {
			this.suggestions = [];
		}, 200);
	}

	useSuggestion(id: number) {
		this.router.navigate(['/cultride', id]);
	}

	clearSearch() {
		this.suggestions = [];
		this.searchPhraze = this.globalPurposeService.jsHelper.defaultSearchValues.searchPhraze;
		this.router.navigate(['/']);
	}


	updateSearchLabels(params: any)
	{
		this.searchPhraze = this.routeParamsService.searchPhraze;

		if(this.routeParamsService.pageSort != undefined && !isNaN(this.routeParamsService.pageSort))
		{
			if(this.routeParamsService.pageSort > 6)
				this.routeParamsService.pageSort = 0;

			for(let value of this.globalPurposeService.jsHelper.sortValues)
			{
				if (value.id === this.routeParamsService.pageSort) {
					this.sortSelector.updateSelectedValue(value.id);
					break;
				}
			}
		}
		else 
			this.sortSelector.updateSelectedValue(this.globalPurposeService.jsHelper.sortValues[0].id);
		
		if(this.routeParamsService.brandName != undefined) {
			let brandName = this.routeParamsService.brandName == "All" ? 'All Categories' : this.globalPurposeService.jsHelper.swapUrlZnakBack(this.routeParamsService.brandName);
			this.categorySelector.updateSelectedValue(brandName);

			if(this.routeParamsService.brandName == "All") {
				this.searchPlaceholder = `Search ...`;
			}
			else {
				this.searchPlaceholder = `Search in ${this.globalPurposeService.jsHelper.swapUrlZnakBack(brandName)}`;
			}
		}
		else {
			this.categorySelector.updateSelectedValue('All Categories');
		}

		if(this.searchPhraze != undefined) {
			this.searchPhraze = this.searchPhraze == "All" ? '' : this.globalPurposeService.jsHelper.swapUrlZnakBack(this.searchPhraze);
		}

		this.cdRef.detectChanges();
	}
}
