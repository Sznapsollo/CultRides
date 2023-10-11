import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class MainCategoryItem {
    public cars: number;
    public machine_name: string;
    public name: string;
    constructor() {
  }
}

@Injectable()
export class MainCategoriesService {
	url: string;
	constructor(private httpClient: HttpClient) {
		this.url = './data/ListCategories.php';
	}
	    
	getData (): Observable<MainCategoryItem[]> {

		let body = JSON.stringify({receive: 'yes'});
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		let options = { headers: headers };

		return this.httpClient.post(this.url, body, options).pipe(map(this.extractData));
	}

	private extractData(res: any) {
	  return res || [];
	}
}