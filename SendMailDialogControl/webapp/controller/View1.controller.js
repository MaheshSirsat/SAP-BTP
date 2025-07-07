sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "project1/controller/SendMail"
], function (Controller, MessageToast,SendMail) {
  "use strict";

  return Controller.extend("project1.controller.View1", {
     
    onOpenDialogPress: function () {
      if (!this._oSendMailDialog) {
        this._oSendMailDialog = new SendMail({
          type: "feedback",  
          send: this.onSendData.bind(this)
        }); 
        this.getView().addDependent(this._oSendMailDialog);
      } 
      this._oSendMailDialog.open();
    },

    onSendData: function (oEvent) {
      const { to, cc, comment, type } = oEvent.getParameters();

      console.log("To:", to);
      console.log("CC:", cc);
      console.log("Comment:", comment);
      console.log("Type:", type);

      MessageToast.show("Comment sent for type: " + type);
    }
  });
});
