/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"project10_06/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
