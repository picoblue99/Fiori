sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("test0000.controller.NewPage", {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter
          .getRoute("NewPage")
          .attachPatternMatched(this._onPatternMatched, this);
      },

      /**
       * Route Pattern이 URI와 일치할 경우 실행
       */
      _onPatternMatched: function (oEvent) {
        console.log('new Page 오픈')
      },
    });
  }
);
