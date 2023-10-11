import {Component, NgModule} from '@angular/core';
import {Item, ItemService} from '../../services/itemservice';
import {GlobalPurposeService} from '../../services/globalpurposeservice';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'item-full',
  styleUrls: ['./item.css'],
  templateUrl: './item.html',
  providers: [ItemService]
})

export class ItemComponent {

	item: Item = new Item();
	itemReady:boolean = false;
	private sub: any;

	constructor(private itemService: ItemService, private globalPurposeService: GlobalPurposeService, private route: ActivatedRoute) {
		this.globalPurposeService.jsHelper.logOperation('ItemComponent constructor');
	}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.itemReady = false;
			this.itemService.getData(+params['itemId'])
			.subscribe({
				next: (data:any) => {this.item = data.cultRide},
				error: (err:any) => {this.globalPurposeService.jsHelper.logOperation('ItemComponent itemService.getData() Error'); console.log(err)},
				complete: () => {this.itemReady = true; this.globalPurposeService.selectedItemName = this.item.make; this.globalPurposeService.jsHelper.logOperation('ItemComponent itemService.getData() Complete')}
			});
		});
	}
	
	ngAfterViewInit() {
		this.globalPurposeService.showInitiallyHidden();
	}
}
