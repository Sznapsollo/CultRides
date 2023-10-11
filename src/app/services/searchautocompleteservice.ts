import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {GlobalPurposeService} from './globalpurposeservice';
import {map} from 'rxjs/operators';

export class SearchAutocompleteItem {
  constructor(
    public id: number,
    public text: number
    ) {
  }
}

@Injectable()
export class SearchAutocompleteService {

	url: string;

	constructor(private httpClient: HttpClient, private globalPurposeService: GlobalPurposeService) {
		this.url = './data/SearchAutocomplete.php';
	}
	    
	getData (searchPhraze:string, brandName: string): Observable<SearchAutocompleteItem[]> {

		let body = JSON.stringify({receive: 'yes', searchPhraze: this.globalPurposeService.jsHelper.swapUrlZnakBack(searchPhraze), brandName: this.globalPurposeService.jsHelper.swapUrlZnakBack(brandName)});
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		let options = { headers: headers };

		return this.httpClient.post(this.url, body, options).pipe(map(this.extractData));
	}

	private extractData(res: any) {
	  return res || [];
	}
}