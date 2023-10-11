import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Item, ItemService} from '../../services/itemservice';
import {SearchAutocompleteItem, SearchAutocompleteService} from '../../services/searchautocompleteservice';
import {GlobalPurposeService} from '../../services/globalpurposeservice';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime} from 'rxjs/operators';


@Component({
	styleUrls: ['./compareitem.css'],
	templateUrl: './compareitem.html',
	selector: 'compare-item',
	providers: [SearchAutocompleteService, ItemService]
})
export class CompareItemComponent {

	@Input() activeCompareItem: boolean;
	@Output() activeCompareItemChange: EventEmitter<any> = new EventEmitter();

	compareItemForm: FormGroup;

	fetchingSuggestions: boolean = false;

	suggestions: SearchAutocompleteItem[];

	chosenItems: Item[];

	item: string = '';


	constructor(private searchAutocompleteService: SearchAutocompleteService, private itemService: ItemService, private globalPurposeService: GlobalPurposeService) {
		this.globalPurposeService.jsHelper.logOperation('CompareItemComponent constructor');

		this.compareItemForm = new FormGroup({
			'searchItemName': new FormControl('', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(255)])
		});
	   	this.compareItemForm.controls['searchItemName'].valueChanges
            .pipe(debounceTime(500))
            .subscribe(
            (text:string) =>  
            {
            	if(this.compareItemForm.valid)
            		this.submitInputSearch(text)
				else
				 	this.stopSuggestions();
            });
	}

	inactivateItem() {
		this.activeCompareItem = false;
		this.activeCompareItemChange.emit(this.activeCompareItem);
	}

	submitInputSearch(text: string) {
		this.fetchingSuggestions = true;
		this.searchAutocompleteService.getData(text, 'All')
		.subscribe({
			next: data => { this.suggestions = data },
			error: err => {this.globalPurposeService.jsHelper.logOperation('Autosuggestion CompareItemComponent Error');  console.log(err)},
			complete: () => {this.fetchingSuggestions = false; this.globalPurposeService.jsHelper.logOperation('CompareItemComponent autosuggestion complete for phraze ', text)}
		});
	}

	stopSuggestions() {
		setTimeout(() => {
			this.suggestions = [];
		}, 500);
	}

	useSuggestion(id: number) {
		this.fetchingSuggestions = true;
		this.stopSuggestions();
		this.itemService.getData(id)
		.subscribe({
			next: (data:any) => {this.chosenItems = []; this.chosenItems.push(data.cultRide)},
			error: (err:any) => {this.globalPurposeService.jsHelper.logOperation('CompareItemComponent itemService.getData() Error'); console.log(err)},
			complete: () => {this.fetchingSuggestions = false; this.globalPurposeService.jsHelper.logOperation('CompareItemComponent itemService.getData() Complete')}
		});
	}

	onSubmit() {
		
	}

}
