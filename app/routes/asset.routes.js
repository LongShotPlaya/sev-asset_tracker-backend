module.exports = (app) => {
    const asset = require("../controllers/asset.controller.js");
    const { 
        authenticate,
        getPermissions,
        getCreatableCategories,
        getEditableCategories,
        getViewableCategories,
        getDeletableCategories,
        checkCanCirculate,
        getPage
    } = require("../authorization/authorization.js");
    const router = require("express").Router();
  
    // Create a new Asset
    router.post("/", [authenticate, getPermissions, getCreatableCategories], asset.create);

    // Check in an asset
    router.post("/:id/check-in", [authenticate, getPermissions, checkCanCirculate], asset.checkIn);

    // Check out an asset
    router.post("/:id/check-out", [authenticate, getPermissions, checkCanCirculate], asset.checkOut);
  
    // Retrieve all Assets
    router.get("/", [authenticate, getPermissions, getViewableCategories, getPage], asset.findAll);
  
    // Retrieve a single Asset with id
    router.get("/:id", [authenticate, getPermissions, getViewableCategories], asset.findOne);
  
    // Update an Asset with id
    router.put("/:id", [authenticate, getPermissions, getEditableCategories], asset.update);
  
    // Delete an Asset with id
    router.delete("/:id", [authenticate, getPermissions, getDeletableCategories], asset.delete);
  
    app.use("/asset-t3/assets", router);
};