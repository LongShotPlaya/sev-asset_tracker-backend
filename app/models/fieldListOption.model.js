module.exports = (sequelize, Sequelize) => {
    return sequelize.define("fieldListOption", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      value: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });

    // Foreign keys:
    // - listId (non-nullable)
};