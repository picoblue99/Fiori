sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("project1003.controller.Main", {
            onInit: function () { 
                var oData = {list:[
                    
                ]};
                var oModel = new JSONModel(oData); // json model 
                // .setModel(모델객체, "모델이름");
                this.getView().setModel(oModel, 'main'); // 뷰에서 사용하기 위해 모델 세팅



                // 초기값 세팅 - 화면이 뜨자마자 각 Input에 10, 20 세팅
                this.byId("idInput1").setValue("10");
                this.byId("idInput2").setValue("20");
            },
            onCalc: function(oEvent) { // 계산 메서드
                var oSelect = this.getView().byId("idSelect"); 
                //select에 선택된 객체값(sap.m.Select) 가져오기

                var sSelectedKey = oSelect.getSelectedKey(); //operator
                var num1 = this.getView().byId("idInput1").getValue();
                var num2 = this.getView().byId("idInput2").getValue();
                var result = 0;
                //getValue로 숫자로 가져옴
              
                //숫자를 문자로 변환
                num1 = Number(num1);
                num2 = Number(num2);
                    //분기 코드: PLUS, MINUS, DIVISION, MULTIPLE
                switch(sSelectedKey) {
                    case "PLUS" : 
                    result = num1+num2;
                    sSelectedKey='+';
                    break;
                    case "MINUS" :
                     result = num1-num2;
                     sSelectedKey='-';   
                     break;
                    case "MULTIPLE" :
                     result = num1*num2;
                     sSelectedKey='*';
                        break;
                    case "DIVISION" :
                     result = num1/num2;
                     sSelectedKey='/';
                        break;
                } sap.m.MessageToast.show(result);
                var oModel = this.getView().getModel("main");
                var oData=oModel.getProperty("/list")
               
                oData.unshift({ 
                    1:num1,2:sSelectedKey,3: num2, 4:"=",5:result
                });

                oModel.setProperty("/list",oData);
            },  
            
        });
    });
