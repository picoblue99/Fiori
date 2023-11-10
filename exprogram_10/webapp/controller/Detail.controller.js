sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    'sap/ui/model/Filter',
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,History,Filter,JSONModel) {
        "use strict";

        return Controller.extend("exam.exprogram10.controller.Detail", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute('RouteDetail').attachPatternMatched(this._patternMatched,this) 
     
            },
            // 패턴과 라우팅 객체가 동일할 때마다 실행
            _patternMatched : function(oEvent){
              //이벤트 객체의 파라미터 정보에 arguments 에서 넘겨받은 데이터 확인
              var oArgu = oEvent.getParameters().arguments;
              // oArgu => { OrderID : OrderID, option: ProductID} Main의 라우팅으로 가져온 값
        
            this.byId("idTitle").setText(oArgu.ProductName + '상품의 주문 조회'); // 선택한 데이터의 OrderID를 제목으로 지정하기
            
        
              // 'Orders(10248)' 데이터 바인딩
              this.getView().bindElement(`/Order_Details_Extendeds(ProductName=${oArgu.ProductName}, ProductSales=${oArgu.option})`);
            },
            //뒤로가기
            onBack : function (){
              var oHistory=History.getInstance();
              var sPreviousHash = oHistory.getPreviousHash();
        
              if (sPreviousHash !== undefined){
                // sap router 히스토리가 없다면
                // window history에서 뒤로 가기
                window.history.go(-1);
              }else{
                // sap router 히스토리가 있으면 메인 화면 이동
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteMain",{});
              }
            }
           
          });
          
    });
