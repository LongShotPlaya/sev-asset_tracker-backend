module.exports = (app) => {
    const reporter = require("../controllers/reporting.controller.js");
    const {
        authenticate,
        getPermissions,
        getReportableCategories,
        getPage,
    } = require("../authorization/authorization.js");
    const router = require("express").Router();
  
    // Retrieve all reportable categories
    router.get("/asset-categories", [authenticate, getPermissions, getReportableCategories, getPage], reporter.getReportableCategories);
    
    // Retrieve all reportable types
    router.get("/asset-types", [authenticate, getPermissions, getReportableCategories, getPage], reporter.getReportableTypes);
    
    // Retrieve a reportable type along with its specified fields and alerts to include
    router.post("/asset-types/:id", [authenticate, getPermissions, getReportableCategories, getPage], reporter.reportAssetsByType);
  
    app.use("/asset-t3/reporting", router);
};