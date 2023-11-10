sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Fragment,Filter,JSONModel,FilterOperator) {
        "use strict";

        return Controller.extend("odata.project1007.controller.Main", {
            onInit: function () {
                var oModel = new sap.ui.model.json.JSONModel({
                    CustomerID : ''
                });
                this.getView().setModel(oModel,"main");
            },

            // formatter 함수
            formatter:{
                fnDateToString : function(value) {
                if(value) {
                // 포맷 객체를 사용하여 날짜 포맷 적용 (Date->String)
                var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern : 'yyyy-MM-dd'
                });

                return oFormat.format(value); //포맷 객체에 value를 넣어 포맷 적용시켜 리턴
                        }
                }, 
            
            fnFreightSum : function(via, freight) {
                
                if(via && freight){ //via와 freight가 true = 값이 존재
                    
                    return via * Number(freight);
                    
                }
            }},
            onValueHelp: function(){
                // this.byId("idDialog").open();
                var oDialog = sap.ui.getCore().byId("idDialog");
                var oModel = this.getView().getModel();
                //다일로그를 1번 로드하여 계속 오픈해주기 위한 작업
                if(!oDialog){ //다이로그 없으면
                    Fragment.load({
                        name : 'odata.project1007.view.fragment.Customer',
                        type : 'XML',
                        controller :this
                   }).then(function(oDialog){ //이 안에서 Dialog 오픈
                    oDialog.setModel(oModel);
                        oDialog.open();
                   });
                }else{ //다이로그가 이미 로드되어 존재하면 오픈만 하면 됨
                    
                    oDialog.open();
                }            
            },

            onClose: function(){
                var oDialog = sap.ui.getCore().byId("idDialog")
                oDialog.close(); 

                //oModel 만들어 이벤트를 일으킨 객체(버튼)로부터 접귾 Dialog 닫기
                // oEvent.getSource().getParent().close();
                
            },
            onSearch: function(){
                
                var oData = this.getView().getModel("main").getData(); //getData로 main의 전체 데이터 가져옴
                var aFilter = []; //CustomerID
                
                // {CustomerID: '' ...} 이런 식으로 값이 들어올 것임
                
                if(oData.CustomerID)
                {
                    var oFilter=new Filter({
                        path: 'CustomerID', // 필터 대상 필드 이름
                        operator:'EQ', // 조건 (EQ, NE, GT, GE, BT, ...)
                        value1: oData.CustomerID , //From 값
                        // oData. ... 이렇게 하면 사용자 입력 값을 가져올 수 있음
                        value2:'' //To 값
                    });
                    aFilter.push(oFilter);
                }
                // var oFilter = new Filter ('CustomerID', 'EQ', oData.CustomerID)); // 객체를 바로 생성해 값을 넣을 수 있음
                // aFliter.push(new Filter ('CustomerID', 'EQ', oData.CustomerID));
                // new Filter {filters : [필터객체1,2,3 ...] , and : true / false});
                
                if(oData.OrderDateFrom && oData.OrderDateTo ){
                    var oFilter=new Filter({
                        path: 'OrderDate', // 필터 대상 필드 이름
                        operator:'BT', // 조건 (EQ, NE, GT, GE, BT, ...)
                        value1: oData.OrderDateFrom , //From 값
                        value2: oData.OrderDateTo //To 값
                    });
                    aFilter.push(oFilter);
                }
                this.byId("idTable").getBinding("items").filter(aFilter);
                //테이블ID로 테이블을 가져와 items에 바인딩된 정보를 가져옴
            },
            onRowSelectionChange: function(oEvent) {
                /*
                선택한 Row의 모델 데이터를 얻는 방법
                1-1. 경로 얻기
                    var sPath = oEvent.getParameters().rowContext.getPath();
                1-2. 해당 경로  사용하여 Model 데이터 얻기
                    var obj = oEvent.getParameters().rowContext.getObject();

                => obj 변수에 내가 선택한 Row의 모델 정보가 들어간다.
                */
               
               var obj = oEvent.getParameters().rowContext.getObject();
               obj.CustomerID;
              
               sap.ui.getCore().byId("idCustClose").fireEvent('press');
               //press라는 이벤트를 동작하겠다
                // 내가 화면에서 버튼을 클릭하지 않더라도 Controller의 특정 구간에서 버튼의 press 이벤트 실행 가능함
               this.getView().getModel('main').setProperty("/CustomerID", obj.CustomerID);
               
            },
            // Detail.view.xml 라우팅 뷰로 이동 펑션
            onNavDetail: function(){
                
                var oRouter = this.getOwnerComponent().getRouter(); 
                oRouter.navTo("RouteDetail" //라우팅객체명
                ,{  
                    OrderID : "Hi", //필수 파라미터
                    option:  123  // 선택 파라미터
            });
            },
            // Main 화면 테이블에서 1건 선택 후 선택된 OrderID를 Detail 화면 title로 지정하는 함수
            selectionChange: function (oEvent){
                
                var obj = oEvent.getParameters().listItem.getBindingContext().getProperty().OrderID; //1.  선택된 테이블 행의 OrderID 가져오기
                // var spath = oEvent.getParameters().listItem.getBindingContextPath(); 2. 경로만 가져와서 속성 가져오기
                // var obj = this.getView().getModel().getProperty(spath).OrderID; 이후 경로의 속성 객체 가져오기

                //이제 불러온 값으로 Detail 화면 타이틀로 라우팅 설정해줌
                var oRouter = this.getOwnerComponent().getRouter(); 
                oRouter.navTo("RouteDetail" //라우팅객체명
                ,{  
                    OrderID : obj, //필수 파라미터
                  
            });
            },
            onSuggest : function(oEvent) {
                var sTerm = oEvent.getParameter("suggestValue");
                var aFilters = [];
                if (sTerm) {
                    aFilters.push(new Filter("CustomerID", FilterOperator.StartsWith, sTerm));
                }
                oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
            }
        });
    });
