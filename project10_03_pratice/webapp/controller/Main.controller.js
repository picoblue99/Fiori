sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("project1003pratice.controller.Main", {
            onInit: function () {

            },
            onCalc: function(){
                var oSelect= this.getView().byId("idSelect");
                
            }
        });
    });
