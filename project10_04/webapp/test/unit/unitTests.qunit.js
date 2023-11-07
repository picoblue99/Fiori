/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"project10_04/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
