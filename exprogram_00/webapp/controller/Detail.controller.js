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

        return Controller.extend("exam.exprogram00.controller.Detail", {
            onInit: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetail").attachPatternMatched(this.onPatternMatched, this);
            },

            onPatternMatched(oEvent) {
                let oParam = oEvent.getParameters().arguments,
                    oFilter = new Filter('ProductName', 'EQ', oParam.id);
                
                this.byId("OrderTable").getBinding("items").filter(oFilter);
                this.byId("detailPage").setTitle(oParam.id + " 상품의 주문 조회");
            }
        });
    });
