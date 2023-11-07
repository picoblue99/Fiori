sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
        'sap/ui/model/Filter'
    ],
    function(Controller,History,Filter) {
      "use strict";
  
      return Controller.extend("odata.project1007.controller.Detail", {
        onInit: function() {
          var oRouter = this.getOwnerComponent().getRouter(); // 라우터 객체 가져옴
          // Detail 라우터에 패턴 매치드 이벤트 붙이기
          oRouter.getRoute('RouteDetail').attachPatternMatched(this._patternMatched,this) 
          // RouteDetail 객체 가져와 패턴(url)에 붙이겠따=>        
        },
        // 패턴과 라우팅 객체가 동일할 때마다 실행
        _patternMatched : function(oEvent){
          //이벤트 객체의 파라미터 정보에 arguments 에서 넘겨받은 데이터 확인
          var oArgu = oEvent.getParameters().arguments;
          // oArgu => { OrderID : 'Hi', option: 123}

          this.byId("detail").setTitle(oArgu.OrderID);

          // 'Orders(10248)' 데이터 바인딩
          this.getView().bindElement(`/Orders(${oArgu.OrderID})`);

          // oArgu.OrderID 값으로 Key값을 얻었기 때문에
          // 그 값을 이용해서 oDataModel.read() 요청을 보낼 수 있다.

          // 단건 조회 요청 보내기
          // this.getView().getModel().read(`/Orders(${oArgu.OrderID})`, {
          //     success: function(oReturn) {
          //     }
          // });

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
        },
        onRead : function() {
          var oDataModel = this.getView().getModel();
          var oFilter = new Filter('CustomerID', 'EQ', 'VINET');
          
          // SEGW URI : /EntitySetName
          oDataModel.read("/Orders", {
              filters : [oFilter],
              success : function(oReturn) {
                debugger;
                  oReturn.results // [ {}, {}, {}, {}, ... , {} ]
              }
            });
          }
      });
    }
  );
  