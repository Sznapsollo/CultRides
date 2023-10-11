import {Component, Input} from '@angular/core';
import {Comment, ItemService} from '../../services/itemservice';
import {GlobalPurposeService} from '../../services/globalpurposeservice';

@Component({
  selector: 'comment-item',
  styleUrls: ['./comment.css'],
  templateUrl: './comment.html'
})

export class CommentComponent {

	@Input() comment: Comment;
	@Input() itemId: number;
	@Input() linksData: boolean;

	showReplies: boolean = false;
	replyToComment: boolean = false;
	dataLoading: boolean = false;
	reportedMessage: string = '';

	constructor(private itemService: ItemService, private globalPurposeService: GlobalPurposeService) {
		this.globalPurposeService.jsHelper.logOperation('CommentComponent constructor');
	}

	reportInvalidLink() {
		this.dataLoading = true;
		this.itemService.reportInvalidComment(this.linksData ? 2 : 1, this.comment.commentId)
		.subscribe({
			next: (data:any) => {
		      	if(data.statusMessage) { 
					this.reportedMessage = data.statusMessage;
		      	}; 
			},
			error: (err:any) => {this.globalPurposeService.jsHelper.logOperation(`CommentComponent itemService.reportInvalidComment(${this.itemId}) Error`); console.log(err)},
			complete: () => {
		      	this.dataLoading = false; 
		      	this.globalPurposeService.jsHelper.logOperation(`CommentComponent itemService.reportInvalidComment(${this.itemId}) Complete`);
			}
		});
	}

}
