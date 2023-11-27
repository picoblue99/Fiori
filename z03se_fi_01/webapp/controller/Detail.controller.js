sap.ui.define(
    [ 'sap/ui/core/mvc/Controller',
    'sap/ui/model/BindingMode',
    'sap/ui/model/json/JSONModel',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format'],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,BindingMode,JSONModel,ChartFormatter,Format) {
      "use strict";
  
      return Controller.extend("z03sefi01.controller.Detail", {
        onInit: function () {
          this.oRouter = this.getOwnerComponent().getRouter();
  
          this.oRouter
            .getRoute("RouteDetail")
            .attachPatternMatched(this._onPatternMatched, this);
          
        },
  
        /**
         * Route Pattern이 URI와 일치할 경우 실행
         * 이벤트 객체의 파라미터 정보에 arguments 에서 넘겨받은 데이터 확인
         */
        _onPatternMatched: function (oEvent) {
            var oArgu = oEvent.getParameters().arguments;
            // this.byId("detail").setTitle(oArgu.Acc_Price);
        },
        fnDateToString : function(value) {
            // debugger;
            if(value) {
            // 포맷 객체를 사용하여 날짜 포맷 적용 (Date->String)
            var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
                pattern : 'yyyy-MM-dd'
            });

            return oFormat.format(value);  
            }
        },
        fnSDPrice : function(value){
            
                //SD cost
                if(value != null) {
                    if(value[1] == 'LA' || value[0] == '1'){   
                        // debugger;
                        // console.log(value[2]);
                        return value[2];   
                    } else {
                        return value[2];
                    }
                
            }
            
            // return oFormat.format(value);
        },
        fnMMPrice : function(value){
            //MM cost
            // debugger;
            if(value != null) {
            if(value[1] == 'AA' && value[0] == '1'){
                return value[2];
            } else if(value[1] == 'AT' && value[0] == '1'){
                return value[2];
            } else if(value[1] == 'AS' && value[0] == '1'){
                return value[2];
            } else {
                return 0;
            }
        } }
        
    
      });
    }
  );
  