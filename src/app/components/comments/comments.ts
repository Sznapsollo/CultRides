import {Component, Input} from '@angular/core';
import {Comment, ItemService} from '../../services/itemservice';
import {GlobalPurposeService} from '../../services/globalpurposeservice';

@Component({
  selector: 'comments-group',
  styleUrls: ['./comments.css'],
  templateUrl: './comments.html',
  providers: [ItemService]
})
export class CommentsGroupComponent {

	@Input() itemId: number;
	@Input() parentId: number;
	@Input() linksData: boolean;

	currentItemId:number;
	comments: Comment[] = [];
	dataLoading: boolean = false;

	canReadMoreComments: boolean = true;
	messagesReadAmount: number = 10;
	commentsStartIndex: number = 0;
	commentsEndIndex: number = this.commentsStartIndex + this.messagesReadAmount;

	constructor(private itemService: ItemService, private globalPurposeService: GlobalPurposeService) {
		this.globalPurposeService.jsHelper.logOperation('CommentsGroupComponent constructor');
	}

	ngOnChanges() {
		if(this.itemId !== undefined) {
			if(this.currentItemId != this.itemId)
				this.comments = [];

			this.currentItemId = this.itemId;
			this.loadComments();
		}
	}

	loadComments() {

		this.dataLoading = true;

		this.itemService.getCommentsData(this.linksData, this.itemId, this.parentId, this.commentsStartIndex, this.messagesReadAmount)
		.subscribe({
			next: data => {
				let counter = 0;
				if(data.hasOwnProperty("length")) {
					data.forEach((val) => {
						this.comments.push(val);
						counter++;
					});
				}
				if(counter < this.messagesReadAmount)
					this.canReadMoreComments = false;
				},
			error: err => { this.globalPurposeService.jsHelper.logOperation('itemService.getCommentsData() Error'); console.log(err); this.canReadMoreComments = false;},
			complete: () => {
				this.globalPurposeService.jsHelper.logOperation('itemService.getCommentsData() Complete'); 
				this.dataLoading = false;
				if(this.linksData) {
					setTimeout(() =>
					{
						this.globalPurposeService.jsHelper.findAndTransformLinks('.comments');
					}, 1000); 
				}
			}
		});
	}

	readMoreComments() {
		this.commentsStartIndex = this.commentsEndIndex;
		this.commentsEndIndex = this.commentsStartIndex + this.messagesReadAmount;
		this.loadComments();
	}
}
