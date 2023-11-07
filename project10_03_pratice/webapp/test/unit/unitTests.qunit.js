/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"project10_03_pratice/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
