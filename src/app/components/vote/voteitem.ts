import {Component, Input} from '@angular/core';
import {Vote, VoteItemService} from '../../services/voteitemservice';
import {GlobalPurposeService} from '../../services/globalpurposeservice';

@Component({
  selector: 'vote-item',
  styleUrls: ['./voteitem.css'],
  templateUrl: './voteitem.html',
  providers: [VoteItemService]
})
export class VoteItemComponent {

	@Input() votes: number;
	@Input() id: number;

	voteMessage: string = '';
	dataLoading: boolean = false;

	constructor(private voteItemService: VoteItemService, private globalPurposeService: GlobalPurposeService) {
		this.globalPurposeService.jsHelper.logOperation('VoteItemComponent constructor');
	}

	voteUp() {
		this.doVote(true);
		this.dataLoading = true;
	}

	voteDown() {
		this.doVote(false);
		this.dataLoading = true;
	}

	get showingMessage() {
		return this.voteMessage.length > 0;
	}

	doVote(choice : boolean) {
		this.voteItemService.getData(choice, this.id)
		.subscribe({
			next: (data:any) => {
				if(data.resultCount != 0) { 
					this.votes = data.resultCount; 
				}; 
				this.voteMessage = data.voteMessage
				if(this.voteMessage.length == 0) {
					if(data.isNewVote)
					{
						this.globalPurposeService.jsHelper.increaseValueBy("#cultRidesVotesSummary .votesSummary",1);
					}
				}
			},
			error: (err:any) => {this.globalPurposeService.jsHelper.logOperation(`VoteItemComponent voteItemService.getData(${choice}) Error`); console.log(err)},
			complete: () => {
				this.dataLoading = false; 
				this.globalPurposeService.jsHelper.logOperation(`VoteItemComponent voteItemService.getData(${choice}) Complete`);

				if(this.voteMessage.length > 0) {
					setTimeout(()=>{this.voteMessage = ''}, 3000);   
				}
			}
		});
	}
}
