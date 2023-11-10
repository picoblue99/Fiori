sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter',
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, JSONModel) {
        "use strict";

        return Controller.extend("exam.exprogram00.controller.Main", {
            onInit: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                this.getView().setModel(new JSONModel({
                    Conditions : {},
                    LocalProducts : [],
                    LocalChart : []
                }), 'main');

                oRouter.getRoute('RouteMain').attachPatternMatched(this.onPatternMatched, this);
            },

            onPatternMatched: function() {
                this.getView().getModel('main').setData({
                    Conditions : {},
                    LocalProducts : [],
                    LocalChart : []
                });

                this.byId("CategoryTable").removeSelections();
            },

            onSearch: function() {
                const oTable = this.byId("CategoryTable"),
                      oMainModel = this.getView().getModel('main');
                let oCondition = oMainModel.getData().Conditions,
                    aFilter = [];
                    
                if(oCondition.CategoryID) 
                    aFilter.push(new Filter('CategoryID', 'GE', oCondition.CategoryID));
                if(oCondition.CategoryName) 
                    aFilter.push(new Filter('CategoryName', 'Contains', oCondition.CategoryName));

                oTable.getBinding("items").filter(aFilter);
                oTable.removeSelections();
                
                oMainModel.setProperty("/LocalProducts", []);
                oMainModel.setProperty("/LocalChart", []);
            },

            onCategorySelect: function(oEvent) {
                debugger;
                let sPath = oEvent.getParameters().listItem.getBindingContextPath(),
                    oMainModel = this.getView().getModel('main'),
                    oSelectData = this.getView().getModel().getProperty(sPath),
                    oFilter = new Filter('CategoryID', 'EQ', oSelectData.CategoryID);

                this.getView().getModel().read("/Products", {
                    filters : [oFilter],
                    success: function(oReturn) {
                        oMainModel.setProperty("/LocalProducts", oReturn.results);
                    }
                });
                
                this.getView().getModel().read("/Sales_by_Categories", {
                    filters : [oFilter],
                    success: function(oReturn) {
                        oMainModel.setProperty("/LocalChart", oReturn.results);
                    }
                });
                    
            },

            onSelectData: function(oEvent) {
                let sProductName = oEvent.getParameters().data[0].data.상품명;

                this.getOwnerComponent().getRouter().navTo("RouteDetail", {
                    id : sProductName
                });

            }
        });
    });
