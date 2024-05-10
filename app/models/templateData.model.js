module.exports = (sequelize, Sequelize) => {
    return sequelize.define("templateData", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      value: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
    });

    // Foreign keys:
    // - templateId (non-nullable)
    // - fieldId (non-nullable)
};