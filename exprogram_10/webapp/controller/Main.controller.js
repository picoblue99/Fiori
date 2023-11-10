sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,FlattenedDataset,FeedItem,Filter) {
        "use strict";

        return Controller.extend("exam.exprogram10.controller.Main", {
            onInit: function () {
                var oList={"list" : [ {'CategoryID' : ''},
                {'ProductName' : ''},
                {'UnitsInStock' : ''},
                {'UnitsOnOrder' : ''} ]};
                var oModel = new sap.ui.model.json.JSONModel(oList);
                this.getView().setModel(oModel,"main");

            },
            // Search
            onSearch : function(){
                var oData = this.getView().getModel().getData();

                var oValue1= this.byId("idInput1").getValue();
                var oValue2= this.byId("idInput2").getValue();
                
                var aFilter=[];
                
                if(oValue1){
                var oFilter= new Filter({
                    path : 'CategoryID',
                    operator : 'GE',
                    value1 : oValue1,
                    value2 : ''
                });
                aFilter.push(oFilter);
            }
                if(oValue2){
                 var oFilter2= new Filter({
                    path : 'CategoryName',
                    operator : 'Contains', // 모르겠다!
                    value1 : oValue2,
                    value2 : ''
                });
                aFilter.push(oFilter2);
            }
                this.byId("idTable").getBinding("items").filter(aFilter);
                
            }, 
            //카테고리 행 클릭 시 상세 조회
            selectionChange : function(oEvent){
                
                // var obj = oEvent.getParameters().listItem.getBindingContext().getProperty().CategoryID; //1.  선택된 테이블 행의 OrderID 가져오기
                var obj = oEvent.getParameters().rowContext.getObject();
                obj.CategoryID;
                
                this.getView().getModel('main').setProperty("/CategoryID", obj.CategoryID);

            },
            onSelectData : function(oEvent){
                var selectProductName = oEvent.getParameters().data[0].data.ProductName;

                //라우팅
                var oRouter = this.getOwnerComponent().getRouter(); 
                oRouter.navTo("RouteDetail" //라우팅객체명
                ,{  
                    OrderID : selectOrderID, //필수 파라미터
                    option: oEvent.getParameters().data[0].data.ProductName  // 선택 파라미터 - ProductID
            });
            }
        });
    });
