import BaseController from "./BaseController";

/**
 * @namespace com.john.ui5.ts.app1.controller
 */
export default class Dashboard extends BaseController {
	public onOpenWizard(): void {
		this.getRouter().navTo("wizard");
	}
}
