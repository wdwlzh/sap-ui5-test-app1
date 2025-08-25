export default {
	name: "QUnit test suite for the UI5 Application: com.john.ui5.ts.app1",
	defaults: {
		page: "ui5://test-resources/com/john/ui5/ts/app1/Test.qunit.html?testsuite={suite}&test={name}",
		qunit: {
			version: 2
		},
		sinon: {
			version: 4
		},
		ui5: {
			language: "EN",
			theme: "sap_horizon"
		},
		coverage: {
			only: "com/john/ui5/ts/app1/",
			never: "test-resources/com/john/ui5/ts/app1/"
		},
		loader: {
			paths: {
				"com/john/ui5/ts/app1": "../"
			}
		}
	},
	tests: {
		"unit/unitTests": {
			title: "Unit tests for com.john.ui5.ts.app1"
		},
		"integration/opaTests": {
			title: "Integration tests for com.john.ui5.ts.app1"
		}
	}
};
