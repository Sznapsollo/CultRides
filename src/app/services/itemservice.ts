import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class ItemVotesCount {
  	votesCount: number;
    itemsCount: number;
    constructor() {
  }
}

export class Comment {
  	body: string;
    name: string;
    created_at: number;
    commentId: number;
    parentCommentId: number;
    itemId: number;
    replies: number;
    deep: number;
    status: boolean;
    statusMessage: string;
 	constructor(){}
}

export class Item {
  	title: string;
    acceleration: number;
    commentsCount: number;
    displacement: number;
    engineCode: string;
    engineLayout: string;
    filename: string;
    filenameAlt: string;
    filenameTitle: string;
    horsepower: number;
    linksCount: number;
    make: string;
    makeTid: number;
    nid: number;
    productionEnd: number;
    productionStart: number;
    rank: number;
    torque: number;
    votes: number;
    weight: number;
    constructor() {
  }
}

@Injectable()
export class ItemService {

	url: string;
	commentsUrl: string;
	commentsAddUrl: string;
	commentsReportInvalidUrl: string;
	linksUrl: string;
	linksAddUrl: string;
	itemsAndVotesCountInfoUrl: string;

	constructor(private httpClient: HttpClient) {
		this.url = './data/ListCultRide.php';
		this.commentsUrl = './data/GetCultRideComments.php';
		this.commentsAddUrl = './data/InsertCultRideComment.php';
		this.commentsReportInvalidUrl = './data/ReportCultRideInvalidComment.php';
		this.linksUrl = './data/GetCultRideLinks.php';
		this.linksAddUrl = './data/InsertCultRideLink.php';
		this.itemsAndVotesCountInfoUrl = './data/GetVotesCount.php';
	}
	    
	getData (id:number): Observable<Item[]> {

		let body = JSON.stringify({receive: 'yes',id: id});
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

	getCommentsData(linksData: boolean, id:number, parentId: number, startIndex: number, endIndex: number): Observable<Comment[]> {

		let url = linksData ? this.linksUrl : this.commentsUrl;

		let body = JSON.stringify({receive: 'yes', id: id, parentId: parentId, startIndex: startIndex, endIndex: endIndex});
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		let options = { headers: headers };

	  return this.httpClient.post(url, body, options).pipe(
            map(this.extractData)
            )
	}

	sendCommentData(linksData:boolean, comment: Comment): Observable<Comment> {

		let url = linksData ? this.linksAddUrl : this.commentsAddUrl;

		let body = JSON.stringify({receive: 'yes', id: comment.itemId, parentId: comment.parentCommentId, name: comment.name, description: comment.body});
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		let options = { headers: headers };

	  	return this.httpClient.post(url, body, options).pipe(
            map(this.extractData)
            )
	}

	reportInvalidComment(commentType:number, id:number): Observable<Comment> {

		let url = this.commentsReportInvalidUrl;

		let body = JSON.stringify({receive: 'yes', id: id, commentType: commentType});
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		let options = { headers: headers };

	  	return this.httpClient.post(url, body, options).pipe(
            map(this.extractData)
            )
	}

	getVotesCountData(): Observable<ItemVotesCount> {

		let body = JSON.stringify({receive: 'yes'});
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		let options = { headers: headers };

	  return this.httpClient.post(this.itemsAndVotesCountInfoUrl, body, options).pipe(
				map(this.extractData)
		)
	}
	
	private extractData(res: any) {
	  return res || { };
	}
}
