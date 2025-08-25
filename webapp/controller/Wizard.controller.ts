import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace com.john.ui5.ts.app1.controller
 */
export default class Wizard extends BaseController {
	public onInit(): void {
		// Initialize model with step 1
		const oModel = new JSONModel({
			currentStep: 1
		});
		this.getView().setModel(oModel);

		// reset wizard each time the wizard route is matched so cancelled data does not persist
		this.getRouter().getRoute("wizard").attachPatternMatched(this._onRouteMatched, this);
	}

	private _onRouteMatched(): void {
		this._resetWizard();
	}

	/**
	 * Reset wizard to step 1 and clear all inputs
	 */
	private _resetWizard(): void {
		const oModel = this.getView().getModel() as JSONModel;
		oModel.setData({
			currentStep: 1
		});

		const oView: any = (this as any).getView();
		
		// clear acknowledgement
		const oAck = oView.byId("ackCheckbox");
		if (oAck && typeof oAck.setSelected === "function") {
			oAck.setSelected(false);
		}

		// clear creation inputs
		const oName = oView.byId("orderName");
		if (oName && typeof oName.setValue === "function") {
			oName.setValue("");
		}
		const oQty = oView.byId("orderQty");
		if (oQty && typeof oQty.setValue === "function") {
			oQty.setValue("");
		}

		// clear review text
		const oReview = oView.byId("reviewText");
		if (oReview && typeof oReview.setText === "function") {
			oReview.setText("");
		}
	}

	public onAckToggle(oEvent: any): void {
		const bSelected = oEvent.getParameter("selected");
		const oModel = this.getView().getModel() as JSONModel;
		
		if (bSelected) {
			// Move to step 2
			oModel.setProperty("/currentStep", 2);
		} else {
			// Go back to step 1
			oModel.setProperty("/currentStep", 1);
		}
	}

	public onNextFromCreate(): void {
		const oView: any = (this as any).getView();
		const oName = oView.byId("orderName");
		const oQty = oView.byId("orderQty");
		const sName = (oName && typeof oName.getValue === "function") ? oName.getValue() : "";
		const sQty = (oQty && typeof oQty.getValue === "function") ? oQty.getValue() : "";
		
		// basic validation
		if (!sName || sName.trim() === "") {
			MessageBox.alert((this.getResourceBundle() as any).then((rb: any) => rb.getText("orderNameRequired")));
			return;
		}
		if (!sQty || Number(sQty) <= 0) {
			MessageBox.alert((this.getResourceBundle() as any).then((rb: any) => rb.getText("orderQtyInvalid")));
			return;
		}

		// set review text and move to step 3
		this.getResourceBundle().then((rb: any) => {
			const sReview = rb.getText("reviewText", [sName, sQty]);
			const oReview = oView.byId("reviewText");
			if (oReview && typeof oReview.setText === "function") {
				oReview.setText(sReview);
			}
			
			// Move to step 3
			const oModel = this.getView().getModel() as JSONModel;
			oModel.setProperty("/currentStep", 3);
		});
	}

	public onSubmit(): void {
		const oView: any = (this as any).getView();
		const oName = oView.byId("orderName");
		const oQty = oView.byId("orderQty");
		const sName = (oName && typeof oName.getValue === "function") ? oName.getValue() : "-";
		const sQty = (oQty && typeof oQty.getValue === "function") ? oQty.getValue() : "-";
		
		const sReview = this.getResourceBundle().then((rb: any) => {
			return rb.getText("reviewText", [sName, sQty]);
		});

		// show confirmation dialog
		Promise.resolve(sReview).then((text: string) => {
			MessageBox.confirm(text, {
				onClose: (sAction: string) => {
					if (sAction === MessageBox.Action.OK) {
						// simulate submit and go back to dashboard
						this.getRouter().navTo("dashboard");
					}
				}
			});
		});
	}

	public onCancel(): void {
		// cancel the order and go back to dashboard
		this.getRouter().navTo("dashboard");
	}
}
