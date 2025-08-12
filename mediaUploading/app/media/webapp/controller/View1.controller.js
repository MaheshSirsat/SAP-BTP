sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.media.media.controller.View1", {
        onInit() {

        },
        onUploadChange: function (oEvent) {
            var sSecurityToken = this.getOwnerComponent()
                .getModel()
                .getSecurityToken();
            var oFileUploader = oEvent.getSource();
            oFileUploader.removeAllHeaderParameters();

            //here on upload you can set value to link with parent enity or even you can add comment as shown in below code but that field should be present in entity
            // oFileUploader.addHeaderParameter(
            //     new sap.ui.unified.FileUploaderParameter({
            //         name: "to_parentEntity_ID",
            //         value: 123
            //     })
            // );


            oFileUploader.addHeaderParameter(
                new sap.ui.unified.FileUploaderParameter({
                    name: "fileName",
                    value: oEvent.getParameter('files')[0].name
                })
            );

            const sParameter = oEvent.getSource().getValue();
            oFileUploader.addHeaderParameter(
                new sap.ui.unified.FileUploaderParameter({
                    name: "slug",
                    value: sParameter,
                })
            );

            oFileUploader.setSendXHR(true);
        },
        onUploadCompleted: function (oEvent) {
            this.getView().getModel().refresh();
        },
        _onDocumentLinkPress: function (oEvent) {
            const sItem = oEvent.getSource().getBindingContext().getObject();
            var link = document.createElement('a');
            link.href = sItem.__metadata.media_src;
            link.setAttribute('download', sItem.fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
    });

});