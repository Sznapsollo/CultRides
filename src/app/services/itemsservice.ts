import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable, throwError} from 'rxjs';
import {Item} from './itemservice';
import {GlobalPurposeService} from './globalpurposeservice';
import {map} from 'rxjs/operators';

@Injectable()
export class ItemssService {

	url: string;

	constructor(private httpClient: HttpClient, private globalPurposeService: GlobalPurposeService) {
		this.url = './data/ListCultRides.php';
	}
	    
	getData (pageSort:number, pageStart: number, pageLimit: number, brandName:string, searchPhraze:string): Observable<Item[]> {

		let body = JSON.stringify({receive: 'yes',sortMode: pageSort, startQuery: pageStart,limitQuery: pageLimit, brandName: this.globalPurposeService.jsHelper.swapUrlZnakBack(brandName), searchPhraze: this.globalPurposeService.jsHelper.swapUrlZnakBack(searchPhraze) });
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		let options = { headers: headers };

	  return this.httpClient.post(this.url, body, options).pipe(
		  	map(this.extractData)
		  	);
            //.map(res => res.json())
            /*
            .subscribe(
		      data => data,
		      err => console.log(err),
		      () => console.log('Authentication Complete')
		    );*/
	}

	private extractData(res: any) {
	  return res || { };
	}

	private handleError (error: any) {
	  // In a real world app, we might use a remote logging infrastructure
	  // We'd also dig deeper into the error to get a better message
	  let errMsg = (error.message) ? error.message :
	    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	  console.error(errMsg); // log to console instead
	  return throwError(() => errMsg);
	}

	/*
	getData(): Array<Cultride> {
		return products.map(p => new Cultride(p.id, p.title, p.price, p.rating, p.description, p.categories));
	}
	*/

  /*(
  getProductById(productId: number): Product {
    return products.find(p => p.id === productId);
  }

  getReviewsForProduct(productId: number): Review[] {
    return reviews
        .filter(r => r.productId === productId)
        .map(r => new Review(r.id, r.productId, new Date(r.timestamp), r.user, r.rating, r.comment));
  }
  getAllCategories(): string[] {
	  return ['Books', 'Electronics', 'Hardware'];
	}
	*/
}

/*
app.service('cultRidesService', function($http, $route) {
		//delete $http.defaults.headers.common['X-Requested-With'];
		this.getData = function() {
			return $http({
				url: 'data/ListCultRides.php',
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				data: {receive: 'yes',sortMode: $route.current.params.pageSort,startQuery: $route.current.params.pageStart,limitQuery: $route.current.params.pageLimit, brandName: $route.current.params.brandName, searchPhraze: $route.current.params.searchPhraze }
			});
		};
	});
*/
