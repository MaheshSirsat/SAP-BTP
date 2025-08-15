sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("project1.controller.Main", {
        onInit() {
        },
        onBeforeRebindTable: function (oEvent) {
            const oBindingParams = oEvent.getParameter("bindingParams");
            const aStatus = this.getView().byId("StatusDropDown").getSelectedKeys();
            if (aStatus && aStatus.length > 0) {
                const orFilters = aStatus.map(status =>
                    new Filter("status", FilterOperator.EQ, status)
                );
                oBindingParams.filters.push(
                    new Filter({ filters: orFilters, and: false }) // 'false' means OR
                );
            }
        }
    });
});