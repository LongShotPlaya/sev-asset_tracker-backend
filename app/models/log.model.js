module.exports = (sequelize, Sequelize) => {
    return sequelize.define("log", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(75),
      },
      type: {
        type: Sequelize.STRING(15),
      },
      condition: {
        type: Sequelize.STRING(25),
      },
      circulationStatus: {
        type: Sequelize.STRING(20),
      },
      maintenanceType: {
        type: Sequelize.STRING(15)
      }
    });

    // Foreign keys:
    // - assetId (non-nullable)
    // - authorId (non-nullable)
    // - personId (nullable)
    // - vendorId (nullable)
};