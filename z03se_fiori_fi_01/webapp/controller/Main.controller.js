sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/odata/v2/ODataModel',
	'sap/ui/comp/sample/smarttable/mockserver/DemoMockServer'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataModel, DemoMockServer) {
        "use strict";

        return Controller.extend("z03sefiorifi01.controller.Main", {
            onInit: function () {
                var oModel, oView;

			this._oMockServer = new DemoMockServer(true);

			oModel = new ODataModel(this._oMockServer.getServiceUrl(), {
				defaultCountMode: "Inline"
			});

			oView = this.getView();
			oView.setModel(oModel);
		},

		onBeforeRebindTable: function (oEvent) {
			var oBindingParams = oEvent.getParameter('bindingParams');
			// Note: This example is based on mock data, so defining the number of expended levels in the beforeRebindTable event should be avoided for
			// performance reasons.
			oBindingParams.parameters.numberOfExpandedLevels = 2;
		},

		onBeforeExport: function(oEvent) {
			var mSettings = oEvent.getParameter('exportSettings');

			/* Disable Web Worker for MockServer usage */
			mSettings.worker = false;
		},

		onExit: function () {
			this._oMockServer.stop();
		}
            
        });
    });
