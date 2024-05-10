module.exports = (sequelize, Sequelize) => {
    return sequelize.define("assetField", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      label: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rowSpan: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      column: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      columnSpan: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      required: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      templateField: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      type: {
        type: Sequelize.STRING(15),
        allowNull: false,
        defaultValue: "TextField",
      }
    });

    // Foreign keys:
    // - assetTypeId (non-nullable)
    // - fieldListId (nullable)

};