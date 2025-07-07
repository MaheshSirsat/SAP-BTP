sap.ui.define(
  [
    "sap/ui/core/Control",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/ui/layout/form/SimpleForm",
    "sap/m/Label",
    "sap/m/MultiInput",
    "sap/m/TextArea",
    "sap/m/Token",
    "sap/m/MessageToast",
  ],
  function (   Control,   Dialog,  Button,  SimpleForm, Label,  MultiInput,   TextArea,  Token, MessageToast  ) {
    "use strict";

    return Control.extend("project1.controller.SendMail", {
      metadata: {
        properties: {
          type: { type: "string", defaultValue: "" },
        },
        events: {
          send: {
            parameters: {
              to: { type: "string[]" },
              cc: { type: "string[]" },
              comment: { type: "string" },
              type: { type: "string" },
            },
          },
        },
      },

      init: function () {
        const that = this;

        const emailValidator = function (oEvent) {
          const text = oEvent.text;
          const rexMail = /^\w+[\w-+.]*@\w+([-.]\w+)*\.[a-zA-Z]{2,}$/;
          if (text.match(rexMail)) {
            return new Token({ key: text, text: text });
          } else {
            MessageToast.show("'" + text + "' is not a valid e-mail address");
            return null;
          }
        };

        this._oDialog = new Dialog({
          titleAlignment: "Center",
          contentWidth: "350px",
          title: "Send Comment",
          content: new SimpleForm({
            editable: true,
            content: [
              new Label({ text: "To" ,required:true}),
              (this._toInput = new MultiInput({
                showValueHelp: false,
                placeholder: "Enter emails and press Enter",
              })),
              new Label({ text: "CC" }),
              (this._ccInput = new MultiInput({
                showValueHelp: false,
                placeholder: "Enter CC and press Enter",
              })),
              new Label({ text: "Comment",required:true }),
              (this._commentArea = new TextArea({
                rows: 5,
                cols: 20,
                growing: true,
                width: "100%",
                placeholder: "Enter comment",
              })),
            ],
          }),
          beginButton: new Button({
            text: "Send",
            type:"Emphasized",
            press: function () {
              const to = that._getTokens(that._toInput);
              const cc = that._getTokens(that._ccInput);
              const comment = that._commentArea.getValue();
              const type = that.getType();
              if (to.length === 0) {
                  MessageToast.show("Please enter at least one recipient in 'To'");
                  return;
                }

                if (!comment) {
                  MessageToast.show("Please enter a comment");
                  return;
                }
              that.fireSend({ to, cc, comment, type });
              that._oDialog.close();
            },
          }),
          endButton: new Button({
            text: "Cancel",
            press: function () {
              that._oDialog.close();
            },
          }),
          afterClose: function () {
            that._oDialog.destroy();
            that.init(); // recreate for reuse
          },
        });

        this._toInput.addValidator(emailValidator);
        this._ccInput.addValidator(emailValidator);
      },

      open: function () {
        this._toInput.removeAllTokens();
        this._ccInput.removeAllTokens();
        this._commentArea.setValue("");
        this._oDialog.setTitle("Send Mail");
        this._oDialog.open();
      },

      _getTokens: function (input) {
        return input.getTokens().map((token) => token.getText());
      },

      exit: function () {
        if (this._oDialog) {
          this._oDialog.destroy();
        }
      },

      renderer: {},
    });
  }
);
