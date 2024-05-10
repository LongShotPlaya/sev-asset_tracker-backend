const db = require("../models");

exports.getReportableCategories = (req, res) => {
    const ids = req.requestingUser.dataValues.reportableCategories;

    db.assetCategory.findAll({
        where: { id: ids },
        ...req.paginator,
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving reportable asset categories!",
        });
    });
};

exports.getReportableTypes = (req, res) => {
    const ids = req.requestingUser.dataValues.reportableCategories;

    db.assetType.findAll({
        include: {
            model: db.assetCategory,
            as: "category",
            required: true,
            attributes: [],
            where: { id: ids },
        },
        ...req.paginator,
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving reportable asset types!",
        });
    });
};

exports.reportAssetsByType = (req, res) => {
    const typeId = parseInt(req.params.id);
    const fields = req.body?.fields;

    if (isNaN(typeId)) return res.status(400).send({
        message: "Invalid asset type id!",
    });
    if (!Array.isArray(fields)) return res.status(400).send({
        message: "Error: \"fields\" must be an array!",
    });
    if (fields.length <= 0) return res.status(400).send({
        message: "Error: must report at least one field!",
    });

    /*
    acquisitionDate
    acquisitionPrice
    condition
    location
    fields: [
        {
            id: "acquisitionDate",
            isField: true,
        },
        {
            id: "acquisitionPrice",
            isField: true,
        },
        {
            id: "condition",
            isField: true,
        },
        {
            id: "location",
            isField: true,
        },
        { // for a field
            id: 3,
            isField: true,
        },
        { // for an alert type
            id: 1,
            isField: false,
        },
    ]
    */

    const assetAttributes = ["id"];
    const fieldIds = [];
    const alertTypeIds = [];
    fields.forEach(field => {
        if (isNaN(parseInt(field.id, 10)) || isNaN(Number(field.id, 10))) assetAttributes.push(field.id);
        else if (field.isField) fieldIds.push(field.id);
        else alertTypeIds.push(field.id);
    });

    const locationInclude = assetAttributes.includes("locationId") ? [
        {
            model: db.room,
            as: "location",
            attributes: ["name"],
            include: {
                model: db.building,
                as: "building",
                attributes: ["abbreviation"],
            },
        }
    ] : [];

    db.asset.findAll({
        where: { typeId },
        attributes: assetAttributes,
        include: [
            {
                model: db.assetData,
                as: "data",
                required: false,
                where: { fieldId: fieldIds },
            },
            {
                model: db.alert,
                as: "alerts",
                required: false,
                where: { typeId: alertTypeIds },
            },
            ...locationInclude,
        ],
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving asset data!",
        });
    })
};