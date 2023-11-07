sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Button",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Button,JSONModel,Fragment) {
        "use strict";
        
        var _oModel;

        return Controller.extend("ux400solving.controller.Main", {
            onInit: function () {
                var oData = {list:[
                    
                ]};
                var oList= new JSONModel(oData);
                this.getView().setModel(oList, 'main'); // 뷰 세팅

                // _oModel=oModel;
                // this._oModel= oModel;
            },
            onRandomPress : function(){
                this.byId("idInput").setValueState('Success'); //초기화
                this.byId("idInput").setValueStateText('');

                var oRandom = Math.floor(Math.random() * 100) + 1
                this.byId("idInput").setValue(oRandom); // Input에 값 할당
                
                var oList = this.getView().getModel("main");
                var oData=oList.getProperty("/list");

                oData.push({value : oRandom}); //oData에 랜덤값 넣기
                
                oList.setProperty("/list",oData); // 변화된 데이터를 모델에 세팅
                console.log(oData);
                /**
                 * 모델가져온다
                 * 테이블에 세팅한 배열 데이터 가져온다
                 * 배열 데이터.push({value:oRandom});
                 * 적용 및 테스트
                 */
                
            },
            onOpenDialog : function() {
                var oDialog = sap.ui.getCore().byId("idDialog");
                var oList = this.getView().getModel();
                //다일로그를 1번 로드하여 계속 오픈해주기 위한 작업
                if(!oDialog){ //다이로그 없으면
                    Fragment.load({
                        name : 'ux400solving.view.fragment.Products',
                        type : 'XML',
                        controller :this
                   }).then(function(oDialog){ //이 안에서 Dialog 오픈
                    oDialog.setModel(oList);
                        oDialog.open();
                   });
                }else{ //다이로그가 이미 로드되어 존재하면 오픈만 하면 됨
                    
                    oDialog.open();
                }            

            },
            onClose : function(){
                var oDialog = sap.ui.getCore().byId("idDialog")
                oDialog.close(); 
            }, //Formatter
            transformDiscontinued : function(value){
              
                if(value) {
                    return 'Yes';
                }else{
                    return 'No';
                }
             
            },
            onValueChange : function() {
                
                var oVail = this.byId("idInput").getValue();
                
                if(oVail>=1 && oVail<=100) { // 값 추가
                    
                    this.byId("idInput").setValueState('Success'); //초기화   
                    this.byId("idInput").setValueStateText('');
                    
                var oList = this.getView().getModel("main");
                var oData=oList.getProperty("/list");

                oData.push({value : oVail}); //oData에 랜덤값 넣기
                
                oList.setProperty("/list",oData); // 변화된 데이터를 모델에 세팅
                // console.log(oData);
                }else{ // 입력불가
                    this.byId("idInput").setValueState('Error');
                    this.byId("idInput").setValueStateText('1 이상 100 이하의 숫자를 입력하세요.');
                    
                } 
            }   
        });
    });
