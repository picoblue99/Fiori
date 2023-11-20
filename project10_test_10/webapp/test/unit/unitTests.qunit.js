/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"project10_test_10/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
