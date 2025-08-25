import BaseController from "./BaseController";

/**
 * @namespace com.john.ui5.ts.app1.controller
 */
export default class App extends BaseController {
	public onInit(): void {
		// apply content density mode to root view
		this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
	}
}
