import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {GlobalPurposeService} from './globalpurposeservice';
import {map} from 'rxjs/operators';

@Injectable()
export class MainApplicationService {

	randomItemId:number;
	randomIdUrl:string;

	constructor(private httpClient: HttpClient, private router: Router, private globalPurposeService: GlobalPurposeService) {
		this.randomIdUrl = './data/RandomRide.php';
	}
	    
	getRandomItemIdData (): Observable<number[]> {

		let body = JSON.stringify({receive: 'yes'});
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		let options = { headers: headers };

	  	return this.httpClient.post(this.randomIdUrl, body, options).pipe(
            map(this.extractData)
            );
	}

	private extractData(res: any) {
	  return res || { };
	}

	redirectToRandomItem() {
		this.getRandomItemIdData()
		.subscribe({
			next: (data:any) => {this.randomItemId = data.id},
			error: (err:any) => {this.globalPurposeService.jsHelper.logOperation('MainApplicationService.getRandomItemIdData() Error'); console.log(err)},
			complete: () => {
				this.globalPurposeService.jsHelper.logOperation(`MainApplicationService.getRandomItemIdData() Complete ${this.randomItemId}`); 
				this.router.navigate(['/cultride', this.randomItemId]);
			}
		});
	}
}
