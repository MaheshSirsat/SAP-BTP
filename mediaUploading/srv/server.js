const cds = require("@sap/cds");

cds.on("bootstrap", (app) => {
  cds.cov2ap.before = (req, res, next) => {
    // custom route processing
    next();
  };
});