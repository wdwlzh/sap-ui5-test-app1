import opaTest from "sap/ui/test/opaQunit";
import MainPage from "./pages/MainPage";

const onTheMainPage = new MainPage();

QUnit.module("Sample Hello Journey");

opaTest("Should open the Hello dialog", function () {
	// Arrangements
	onTheMainPage.iStartMyUIComponent({
		componentConfig: {
			name: "com.john.ui5.ts.app1"
		}
	});

	// Actions
	onTheMainPage.iPressTheSayHelloWithDialogButton();

	// Assertions
	onTheMainPage.iShouldSeeTheHelloDialog();

	// Actions
	onTheMainPage.iPressTheOkButtonInTheDialog();

	// Assertions
	onTheMainPage.iShouldNotSeeTheHelloDialog();

	// Cleanup
	onTheMainPage.iTeardownMyApp();
});

opaTest("Should close the Hello dialog", function () {
	// Arrangements
	onTheMainPage.iStartMyUIComponent({
		componentConfig: {
			name: "com.john.ui5.ts.app1"
		}
	});

	// Actions
	onTheMainPage.iPressTheSayHelloWithDialogButton();
	onTheMainPage.iPressTheOkButtonInTheDialog();

	// Assertions
	onTheMainPage.iShouldNotSeeTheHelloDialog();

	// Cleanup
	onTheMainPage.iTeardownMyApp();
});
