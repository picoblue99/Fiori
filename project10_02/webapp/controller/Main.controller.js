sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Button"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Button) {
        "use strict";

        return Controller.extend("project1002.controller.Main", {
            Text : {
                'firstName' : 'A',
                'lastName' : 'eunsol'
            },            
            // initialization 함수이며 Controller 로드 시 자동 실행
            onInit: function () { 
                var sText = this.Text.firstName; // 'A'
                console.log(sText);
            },

            onClick: function(oEvent){
                alert(oEvent);
            },
            onChange: function() { // Input 객체 가져오기
                var oInput = this.getView().byId("idInput");

                //console.log(oInput.getValue());

                var oText = this.getView().byId("idText"); // 입력받은 값 가져오기
                oText.setText(oInput.getValue()); // 가져온 값을 설정해줌
                
            }
        });
    });
