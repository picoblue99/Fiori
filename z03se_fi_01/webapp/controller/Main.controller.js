sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("z03sefi01.controller.Main", {
            onInit: function() {
                const oRouter = this.getOwnerComponent().getRouter();
                var oModel = new JSONModel({LocalChart : []});
                oModel.loadData("../model/Coa.json")
                this.getView().setModel(oModel,'main');

                this._setModel();
 
            },

            _setModel: function() {
                var oJSONModel = this.getView().getModel('main');
          
                this.getOwnerComponent().getModel().read("/Z03se_fit_slip_iSet", {
                    success: function(oReturn) {
                        /*
                            AA,AS => 유동자산
                            AT => 비유동자산
                            LA => 유동부채
                            EA => 자본금
                        */
                        var aCategory = oJSONModel.getData();

                        var oAccCod = oReturn.results.reduce(function(pre, item, idx){
                            if(!pre[item.AccCod]) pre[item.AccCod] = item;
                            return pre;
                        }, {});

                        var results = aCategory.categories.map(function(item) {
                            switch(item.name) {
                                case '자산': // AA,AS,AT
                                    var cAssets = item.categories[0].categories.filter(function(item){
                                        if(oAccCod[item.code] && oAccCod[item.code].AccPrice) {
                                            item.amount = Number(oAccCod[item.code].AccPrice);
                                            return item;
                                        }
                                    });
                                    var fAssets = item.categories[1].categories.filter(function(item){
                                        if(oAccCod[item.code] && oAccCod[item.code].AccPrice) {
                                            item.amount = Number(oAccCod[item.code].AccPrice);
                                            return item;
                                        }
                                    });

                                    item.categories[0].categories = cAssets;
                                    item.categories[1].categories = fAssets;

                                    break;
                                case '부채': // LA
                                    var lIabilities = item.categories[0].categories.filter(function(item){
                                        if(oAccCod[item.code] && oAccCod[item.code].AccPrice) {
                                            item.amount = Number(oAccCod[item.code].AccPrice);
                                            return item;
                                        }
                                    });
                                    item.categories[0].categories = lIabilities;
                                    break;
                                case '자본': // EA
                                    var eQuity = item.categories[0].categories.filter(function(item){
                                      if(oAccCod[item.code] && oAccCod[item.code].AccPrice) {
                                          item.amount = Number(oAccCod[item.code].AccPrice);
                                          return item;
                                      }
                                  });
                                    item.categories[0].categories = eQuity;
                                    break;
                            }
                            return item;
                        });
                        oJSONModel.setProperty("/categories", results)
                        oJSONModel.refresh(true);
                    }
                })
            },
            onCategorySelect : function(oEvent){
                debugger;
                let sProductName = oEvent.getParameters();
            },
            onSelectData: function(oEvent) {
                let sProductName = oEvent.getParameters();
             
                // this.getOwnerComponent().getRouter().navTo("RouteDetail", {
                //     id : sProductName
                // });
            },
    
            onCollapseAll: function() {
                var oTreeTable = this.byId("TreeTableBasic");
                oTreeTable.collapseAll();
            },
    
            onCollapseSelection: function() {
                var oTreeTable = this.byId("TreeTableBasic");
                oTreeTable.collapse(oTreeTable.getSelectedIndices());
            },
    
            onExpandAllLevel: function() {
                var oTreeTable = this.byId("TreeTableBasic");
                oTreeTable.expandToLevel(2);
            },
    
            onExpandSelection: function() {
                var oTreeTable = this.byId("TreeTableBasic");
                oTreeTable.expand(oTreeTable.getSelectedIndices());
            }
        });
    });
