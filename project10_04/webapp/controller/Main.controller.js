sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("project1004.controller.Main", {
            onInit: function () {
                var oData = { 
                    name :{ 
                        firstName : 'Ahn', //oData(변수).name.firstName 으로 가져올 수 있음
                        lastName : 'eunsol', //oData(변수).name.lastName 으로 가져올 수 있음
                    },
                    inpValue : 'Aespa',
                    txtValue:'',
                    
                    list :[
                        {name: 'Ahn', age:'23', tel: '010-1111-2222' }, // 인덱스 0
                        {name: 'Kim', age:'24', tel: '010-5111-6444'},  // 인덱스 1
                        {name: 'Park', age:'25', tel: '010-5555-6666'} // 인덱스 2
                    ]
                }; // json data
                var oModel = new JSONModel(oData); // json model 

                // .setModel(모델객체, "모델이름");
                this.getView().setModel(oModel, 'main'); // 뷰에서 사용하기 위해 모델 세팅
               // this.getView().setModel(oModel,'test');
                
            },
            onClick : function(oEvent) {
               //  debugger;
                var oModel = this.getView().getModel("main");
                // View에서 setModel을 했으므로 여기서는 뷰의 모델 getModel 사용
                // 모델에거 데이터 가져오기
                // oModel.getData() //         : 전체 데이터 가져오기
                // oModel.getProperty(경로) // : 특정 데이터 가져오기
            
                // var oData = oModel.getData().inpValue; // "input 값"
                var oData = oModel.getProperty("/inpValue");
                console.log(oData);

                oModel.setProperty("/txtValue", oData);
                
            },
            onAdd : function(oEvent){
                  // 이벤트 함수에는 항상
                // import parameter로 들어오는 객체가 존재함
              
                //oEvent.getSource =>이벤트를 일으킨 객체를 반환
                // oEvent.getParameters => 이벤트 관련 정보를 반환
                var oModel = this.getView().getModel("main");
                var oData=oModel.getProperty("/list")
                oData.push({
                    /* name : 'Ahn', age: '20', tel:"010-1111-1414"*/
                });

                oModel.setProperty("/list",oData);
            },
            onRowActionItem: function(oEvent){
                // 내가 선택한 row에 바인딩된 모델(main) 경로 등을 알 수 있다
                // oEvent.getParameter('row')getBindingContext('main')

                //내가 선택한 Row의 Index 정보를 알 수 있다
                var iIndex = oEvent.getParameter('row').getIndex();
            
                // Index 정보로 삭제 구현 (pop은 맨 아랫줄부터 삭제해줌)
                // 내가 선택한 행이 삭제되도록 구현하기
                var oModel = this.getView().getModel('main');
                var aList = oModel.getData().list;
                    
                   //aList 배열 요소 중 iIndex 위치부터 1개 삭제 
                    aList.splice(iIndex,1);
                    //splice(삭제할 인덱스, 수)
                  oModel.setProperty("/list",aList);
            },
            onDelete: function(oEvent) {
              // 단건삭제
                // var oModel = this.getView().getModel("main");
                // var oData = oModel.getProperty("/list"); // 배열값 가져오기
                // oData.pop({});
                // oModel.setProperty("/list",oData);          

             //다중삭제
              var oModel = this.getView().getModel("main"); //뷰 바라보기
                var oData = oModel.getProperty("/list"); //모델 세팅
               
                var tab = this.byId("tt"); //테이블 객체 가져오기
                var dList = tab.getSelectedIndices();
                
                if(dList.length==0) {
                    alert("데이터를 선택하세요");
                }    
                else{
                    for(var i=dList.length; i>0; i--){
                    oData.splice(dList[i-1],1);
                }
                oModel.setProperty("/list",oData);
                }    
            },  onDelete2: function(oEvent){ // 다중삭제 강사님 해답
                var oTable = this.byId("tt"),
                    aIndices = oTable.getSelectedIndices(),
                    aList = this.getView().getModel("main").getProperty("/list");
                if(!aIndices.length) // 길이가 0일 경우, !0은 true를 리턴함
                    return sap.m.MessageBox.error("데이터를 선택해주세요.");
                    // 예외처리. 사용자가 선택한 Row가 없는 경우 에러 메시지를 출력함
                else{ //선택된 index 중, 맨 마지막 index부터 순차적으로 삭제함
                    for(var i=aIndices.length-1; i>=0; i--){
                        aList.splice(aIndices[i],1);
                    }
                    this.getView().getModel("main").setProperty("/list",aList);
            }// 삭제가 적용된 배열 데이터를 모델에 세팅함
        }
        });
    });
