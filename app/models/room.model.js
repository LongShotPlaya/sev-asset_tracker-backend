module.exports = (sequelize, Sequelize) => {
    return sequelize.define("room", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });

    // Foreign keys:
    // - buildingId (non-nullable)
};