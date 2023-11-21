sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("z03sefi01.controller.Main", {
            onInit: function() {
                var oModel = new JSONModel();
                oModel.loadData("../model/Coa.json")
                this.getView().setModel(oModel,'main');

            },
    
            onCollapseAll: function() {
                var oTreeTable = this.byId("TreeTableBasic");
                oTreeTable.collapseAll();
            },
    
            onCollapseSelection: function() {
                var oTreeTable = this.byId("TreeTableBasic");
                oTreeTable.collapse(oTreeTable.getSelectedIndices());
            },
    
            onExpandFirstLevel: function() {
                var oTreeTable = this.byId("TreeTableBasic");
                oTreeTable.expandToLevel(1);
            },
    
            onExpandSelection: function() {
                var oTreeTable = this.byId("TreeTableBasic");
                oTreeTable.expand(oTreeTable.getSelectedIndices());
            }
        });
    });
