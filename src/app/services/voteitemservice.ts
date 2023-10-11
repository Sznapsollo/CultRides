import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class Vote {
  	title: string;
    acceleration: number;
    commentsCount: number;
    constructor() {
  }
}

@Injectable()
export class VoteItemService {
	url: string;
	constructor(private httpClient: HttpClient) {
		this.url = './data/VoteCultRide.php';
	}
	    
	getData (vote: boolean, id:number): Observable<Vote[]> {

		let body = JSON.stringify({receive: 'yes', vote: vote, id: id});
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		let options = { headers: headers };

	  return this.httpClient.post(this.url, body, options)
			.pipe(
					map(this.extractData)
			)
	}

	private extractData(res: any) {
	  return res || { };
	}
}
