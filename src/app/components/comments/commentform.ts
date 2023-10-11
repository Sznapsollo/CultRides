import {Component, Input, forwardRef} from '@angular/core';
import {Comment, ItemService} from '../../services/itemservice';
import {GlobalPurposeService} from '../../services/globalpurposeservice';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'comment-form',
	styleUrls: ['./commentform.css'],
	templateUrl: './commentform.html',
	providers: [ItemService],
})
export class CommentFormComponent {

	@Input() parentid: number;
	@Input() itemId: number;
	@Input() linksData: boolean;

	comments: Comment[] = [];
	dataLoading: boolean = false;
	addCommentForm: FormGroup;
	currentItemId:number;
	commentsSyncMessage: string;

	constructor(private itemService: ItemService, private globalPurposeService: GlobalPurposeService) {
		this.globalPurposeService.jsHelper.logOperation('CommentFormComponent constructor');

		this.createForm();
	}

	ngOnChanges() {
		if(this.itemId !== undefined) {
			if(this.currentItemId != this.itemId)
				this.comments = [];

			this.currentItemId = this.itemId;
		}
	}

	createForm() {
		this.addCommentForm = new FormGroup({
	    	'commentBody': new FormControl('', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(1000)]),
	    	'antiSpam': new FormControl('', [<any>Validators.required, <any>this.createValidator()]),
	    	'nickName': new FormControl('', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(50)])
	    });
	}

	get antiSpamMessage()
	{
		if(this.isFromCultRide)
			return "Prove that you are not a robot. What is the car maker of this car?";
		else
			return "Prove that you are not a robot. What is the magic word?";
	}
		
	get isFromCultRide()
	{
		if(this.itemId == 1)
			return false;
		else
			return true;
	}

	onSubmit() {
		if (this.addCommentForm.valid) {

			this.dataLoading = true;
			var comment: Comment = new Comment();
			comment.itemId = this.itemId;
			comment.parentCommentId = this.parentid;
			comment.body = this.addCommentForm.value.commentBody;
			comment.name = this.addCommentForm.value.nickName;

			this.itemService.sendCommentData(this.linksData, comment)
			.subscribe({
				next: data => {
					if(data.status)
					{
						this.comments.push(data)

						setTimeout(() =>
						{
							this.globalPurposeService.jsHelper.findAndTransformLinks('.comments');
						}, 1000); 
					}
					else
					{
						let text = "There was an error during creation of the comment. Comment has not been added";
						if(data.statusMessage.length > 0)
							text = data.statusMessage;
						
						this.commentsSyncMessage = text;
					}
				},
				error: err => {this.globalPurposeService.jsHelper.logOperation('itemService.sendCommentData() Error'); console.log(err)},
				complete: () => {
					this.dataLoading = false;
					this.reset()
					this.globalPurposeService.jsHelper.logOperation('itemService.sendCommentData() Complete')
				}
			});

		  //console.log(this.addCommentForm.value);
		}
	}

	reset() {
		this.addCommentForm.reset();
	}

	createValidator() {
	    return (control:any) =>  {
	    	if(control.value != null && control.value.length > 0 && ((this.isFromCultRide && this.globalPurposeService.selectedItemName.toUpperCase() != control.value.toUpperCase()) || (!this.isFromCultRide && "cultride".toUpperCase() != control.value.toUpperCase())))
	    		return { antiRobotValidator: true };
	    	else 
	    		return null;
	    };
	  }
}

