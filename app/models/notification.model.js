module.exports = (sequelize, Sequelize) => {
    return sequelize.define("notification", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      message: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });

    // Foreign keys:
    // - userId (non-nullable)
};