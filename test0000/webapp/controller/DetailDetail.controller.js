sap.ui.define(
    ["sap/ui/core/mvc/Controller"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
      "use strict";
  
      return Controller.extend("test0000.controller.DetailDetail", {
        onInit: function () {
          this.oRouter = this.getOwnerComponent().getRouter();
          this.oRouter
            .getRoute("DetailDetail")
            .attachPatternMatched(this._onPatternMatched, this);
        },
  
        /**
         * Route Pattern이 URI와 일치할 경우 실행
         */
        _onPatternMatched: function (oEvent) {
            console.log("DetailDetail Page 오픈")
            this._product = oEvent.getParameters().arguments.product;
        },

      /**
       * 뒤로가기 버튼 클릭 시 이전 화면으로 이동
       */
        onNavButtonPress: function() {
          var oNextUIState = this.getOwnerComponent()
            .getHelper()
            .getNextUIState(1);
  
          this.oView
            .getParent()
            .getParent()
            .setLayout("TwoColumnsMidExpanded");
          this.oRouter.navTo("Detail", {
            layout: oNextUIState.layout,
            product: this._product
          });
        }
      });
    }
  );
  