sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel, FlattenedDataset,FeedItem) {
        "use strict";

        return Controller.extend("project1009.controller.Main", {
            onInit: function () {
                this._setChartInView();
            },
            _setChartInView : function() {
                var oModel = new JSONModel();
                oModel.loadData("../model/Product.json"); 
                this.getView().setModel(oModel, "view");     
            }
        });
    });
