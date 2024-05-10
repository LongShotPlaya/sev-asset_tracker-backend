module.exports = (app) => {
    const assetCategory = require("../controllers/assetCategory.controller.js");
    const {
        authenticate,
        getPermissions,
        getViewableCategories,
        checkCreateCategory,
        checkEditCategory,
        checkDeleteCategory,
        getPage,
    } = require("../authorization/authorization.js");
    const router = require("express").Router();
  
    // Create a new AssetCategory
    router.post("/", [authenticate, getPermissions, checkCreateCategory], assetCategory.create);
  
    // Retrieve all AssetCategories
    router.get("/", [authenticate, getPermissions, getViewableCategories, getPage], assetCategory.findAll);
  
    // Retrieve a single AssetCategory with id
    router.get("/:id", [authenticate, getPermissions, getViewableCategories], assetCategory.findOne);
  
    // Update an AssetCategory with id
    router.put("/:id", [authenticate, getPermissions, checkEditCategory], assetCategory.update);
  
    // Delete an AssetCategory with id
    router.delete("/:id", [authenticate, getPermissions, checkDeleteCategory], assetCategory.delete);
  
    app.use("/asset-t3/asset-categories", router);
};