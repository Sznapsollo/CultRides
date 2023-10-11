import {Injectable} from "@angular/core";

declare var helperJSLib: any;

@Injectable()
export class GlobalPurposeService {

	jsHelper: any;
	selectedItemName: string = '';

	constructor() {
		this.jsHelper = new helperJSLib();
		this.jsHelper.logOperation('GlobalPurposeService constructor');
	}
	
	showInitiallyHidden() {
		this.jsHelper.fadeIn(".initiallyHidden");
	}
}
