sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter,JSONModel,FilterOperator) {
        "use strict";

        return Controller.extend("sap.btp.ux410solving.controller.Main", {
            onInit: function () {
                var oList= { 
                    "list" : [
                    {'type':'bar'},
                    {'type':'column'},
                    {'type':'line'},
                    {'type':'donut'}
                ]};
  
                var oModel = new JSONModel(oList);
                this.getView().setModel(oModel, "main");

                this.byId("idCombobox").setValueState('None'); //초기화
                this.byId("idCombobox").setValueStateText('');
            },
            onSearch: function(){
                var oData = this.byId("idCombobox").getValue();
                 var aFilter = []; 
                 if(oData){
                var oFilter = new Filter ('OrderID', 'EQ', oData);
                aFilter.push(oFilter);
                 }
                this.byId("idFlattenedDataset").getBinding("data").filter(aFilter); //차트 데이터 바인딩
                

                //Type 유효성 검사
                var oVail = this.byId("idCombobox2").getValue();

                if(oVail) { // 값 추가
                this.byId("idCombobox2").setValueState('None'); //초기화
                this.byId("idCombobox2").setValueStateText('');
               
                var oChart = this.byId("idVizFrame");
                oChart.setVizType(oVail);

               }else{ // 입력불가
                this.byId("idCombobox2").setValueState('Error');
                this.byId("idCombobox2").setValueStateText('타입을 선택하세요.');
              } 
            },
            onselectData: function(oEvent){
                
                var selectOrderID = oEvent.getParameters().data[0].data.OrderID;

                //라우팅
                var oRouter = this.getOwnerComponent().getRouter(); 
                oRouter.navTo("RouteDetail" //라우팅객체명
                ,{  
                    OrderID : selectOrderID, //필수 파라미터
                    option: oEvent.getParameters().data[0].data.ProductID  // 선택 파라미터 - ProductID
            });
            }
            
        });
    });
