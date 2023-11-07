sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Fragment) {
        "use strict";

        return Controller.extend("project1006.controller.HelloPanel", {
            onInit: function () {
var oDialog = sap.ui.getCore().byId("idDialog")
            },
            onOpenDialog: function() {
                var oDialog = sap.ui.getCore().byId("idDialog") 
                //다일로그를 1번 로드하여 계속 오픈해주기 위한 작업
                if(!oDialog){ //다이로그 없으면
                    Fragment.load({
                        name : 'project1006.view.fragment.Dialog',
                        type : 'XML',
                        controller :this
                   }).then(function(oDialog){ //이 안에서 Dialog 오픈
                        oDialog.open();
                   });
                }else{ //다이로그가 이미 로드되어 존재하면 오픈만 하면 됨
                    oDialog.open();
                }            
            },
            onClose: function(){
                var oDialog = sap.ui.getCore().byId("idDialog")
                oDialog.close();
            }
        });
    });