import {Component} from '@angular/core';
import {ItemVotesCount, ItemService} from '../../services/itemservice';
import {GlobalPurposeService} from '../../services/globalpurposeservice';

@Component({
  selector: 'items-and-votes-count-info',
  styleUrls: ['./itemsvotecountinfo.css'],
  templateUrl: './itemsvotecountinfo.html',
  providers: [ItemService],
})

export class ItemsVoteCountInfoComponent {

	dataLoading:boolean = true;
	votesCount:number;
	itemsCount:number;

	constructor(private itemService: ItemService, private globalPurposeService: GlobalPurposeService) {
		this.globalPurposeService.jsHelper.logOperation('ItemsVoteCountInfoComponent constructor');
	}

	ngOnInit() {
		this.itemService.getVotesCountData()
		.subscribe({
			next: data => {this.votesCount = data.votesCount; this.itemsCount = data.itemsCount;},
			error: err => {this.globalPurposeService.jsHelper.logOperation('ItemsVoteCountInfoComponent itemService.getVotesCountData() Error'); console.log(err)},
			complete: () => {this.dataLoading = false; this.globalPurposeService.jsHelper.logOperation('ItemsVoteCountInfoComponent itemService.getVotesCountData() Complete')}
		});
	};
}
