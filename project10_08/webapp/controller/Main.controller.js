sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem",
    'sap/m/Label',
    'sap/m/ColumnListItem',
    'sap/m/library', 
    'sap/m/MessageToast', 
    'sap/m/Column'

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel, FlattenedDataset,FeedItem,Label,
        ColumnListItem, MobileLibrary, MessageToast, Column) {
        "use strict";

        return Controller.extend("project1008.controller.Main", {
            onInit: function () {
               this._setChartInView();
               this._setChartInController(); 
            },
            _setChartInView : function() {
                var oModel = new JSONModel();
                oModel.loadData("../model/List.json"); 
                this.getView().setModel(oModel, "view");     
            },
            _setChartInController : function() {
                var oModel = new JSONModel();
                oModel.loadData("../model/Sales.json"); 
                // 특정 모델의 데이터를 사용할 수 있도록 로드하는 메서드
                // 경로는 한단계 위인 webapp으로 가서, model폴더로 들어간 후 Sales 파일에 들어간다는 의미
                this.getView().setModel(oModel, "cont");
                // chart
                var oChart = this.byId("idChart");
                // dataset
                var oDataSet = new FlattenedDataset({
                    dimensions : [{
                        name: 'Product', value: '{cont>product}' //x축
                    }],
                    measures : [{
                        name: 'Amount', value: '{cont>amount}' //y축
                    }],
                    data: {path: 'cont>/sales'}
                });

                oChart.setDataset(oDataSet);
                
                // feed
                var feedValueAxis = new FeedItem({
                    uid : "valueAxis",
                    type: "Measure",    // y축
                    values : ["Amount"]
                });

                var feedCategoryAxis = new FeedItem({
                    uid : "categoryAxis",
                    type: "Dimension",
                    values : ["Product"]
                });

                oChart.addFeed(feedValueAxis);
                oChart.addFeed(feedCategoryAxis);

                oChart.setVizType("bar");

                //optional property setting
                oChart.setVizProperties({
                    title : {text : 'Sales Data'},
                    plotArea : {colorPalette : ['#E8D9FF', '#FFD9EC'] }
                })

                // var oFeed =;
            }
        });
    });
