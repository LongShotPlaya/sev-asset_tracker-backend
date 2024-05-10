module.exports = (sequelize, Sequelize) => {
    return sequelize.define("alert", {
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
      status: {
        type: Sequelize.STRING(25),
        allowNull: false,
      }
    });

    // Foreign Keys:
    // - "typeId (non-null)"
    // - "assetId (non-null)"
};