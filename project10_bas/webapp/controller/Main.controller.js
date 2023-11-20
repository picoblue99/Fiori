sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1.controller.Main", {
            onInit: function () {
                var oModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(oModel,"main");
            },
            onReadEntitySet: function(){
                // OData Model 전체 조회
                // Get 요청 : /MemberSet
                // 현재 등록된 Odata 모델은 "" 이름이 없는 모델로 세팅되어 있음 => getModel() 빈 값으로 가져오기
                
                this.getView().getModel().read("/MemberSet",{
                    success: function(oReturn){
                       //성공 시 Response Data가 oReturn으로 들어옴
                        //아밥- 백딴에서 ET_ENTITYSET 인터널 테이블에 데이터를 받아내는 것
                        
                    }
                }) 
            },
            //단건조회(GET)
            onReadEntity : function() {
                var oMainModel = this.getView().getModel('main');
                var oMainData = oMainModel.getData();
                var oTable = this.byId("idTable");
                var aFilter=[];
                // var oFilter = [];
                if(oMainData.Memid){
                    aFilter.push(new sap.ui.model.Filter('Memid', 'EQ', oMainData.Memid))
                }
                if(oMainData.Memnm){
                    aFilter.push(new sap.ui.model.Filter('Memnm', 'EQ', oMainData.Memnm))
                }
                if(oMainData.Telno){
                    aFilter.push(new sap.ui.model.Filter('Telno', 'EQ', oMainData.Telno))
                }
                if(oMainData.Email){
                    aFilter.push(new sap.ui.model.Filter('Email', 'EQ', oMainData.Email))
                }
                // oFilter = new sap.ui.model.Filter({ filters : aFilter })
                oTable.getBinding("rows").filter(aFilter);

                // var oTable= this.byId("idTable");
                // var index= oTable.getSelectedIndex();
                // var oMainModel = this.getView().getModel('main');
                // var path = oTable.getContextByIndex(index).getPath();
                // // 데이터 가져오는 방법 (1)
                // // this.getView().getModel().getProperty(path);

                // //데이터 한 건 가져오는 방법 (2)
                // this.getView().getModel().read(path,{
                //     success : function(oReturn){
                //         // oReturn 값에 데이터가 들어 있음
                //         oMainModel.setData(oReturn);
                //     }.bind(this)
                // });
               
            },
            // 생성(POST) /MemberSet + Body   => {key:value} 형태의 데이터구조
            onCreate : function(){
                var oMainModel = this.getView().getModel('main');
                var oData = oMainModel.getData();
                /**oData 변수에 들어가 있는 json data
                 * {
                 *  Memid : '입력값',
                 *  Memnm : '입력값',
                 *  Telno : '입력값',
                 *  Email : '입력값'
                 * }
                 */ 
                this.getView().getModel().create("/MemberSet", oData, {
                    success : function(oReturn){
                        // create 시 수정해야 할 데이터가 있을 떄 success 구문을 사용
                        sap.m.MessageToast.show("데이터 생성 완료");
                    },
                    error : function(oError){
                        
                    }
                });
                
            },

            // 변경(PUT)
            onUpdate : function(){
                // /MemberSet('key') + Body
                var oMainModel = this.getView().getModel('main');
                var oDtataModel = this.getView().getModel();
                var oData = oMainModel.getData();

                // path = "/MemberSet('key')" 로 들어감
                var path = oDtataModel.createKey("/MemberSet", { 
                    Memid : oData.Memid
                })  //"/MemberSet(Memid='1',key2='' ...)"

                oDtataModel.update(path,oData,{
                    success : function(oReturn){
                        sap.m.MessageToast.show("데이터 업데이트 완료");
                    }
                });
            },

            //삭제(DELETE)
            onDelete : function(){
                // "/MemberSet('key')" 경로를 만들어서 삭제하기
                // oDataModel.remove(경로,옵션 객체) 사용
                var oMainModel = this.getView().getModel('main');
                var oDataModel = this.getView().getModel();
                var oData = oMainModel.getData();

                var path = oDataModel.createKey("/MemberSet",{
                    Memid: oData.Memid
                })

                oDataModel.remove(path,{
                    success : function(oReturn){
                        sap.m.MessageToast.show("데이터 삭제 완료");
                    }
                });
            },
            // 행 선택하면 데이터 불러오기
            onSelectRow : function(oEvent){
                var path = oEvent.getParameters().rowContext.getPath();
                var oSelectData = this.getView().getModel().getProperty(path);
                
                this.getView().getModel('main').setData({
                    Memid: oSelectData.Memid,
                    Memnm: oSelectData.Memnm,
                    Telno: oSelectData.Telno,
                    Email: oSelectData.Email
                });
            },
            
            onReset : function(){

                this.getView().getModel('main').setData({
                    Memid:"",
                    Memnm:"",
                    Telno:"",
                    Email:""
                });
              
            }
        });
    });

