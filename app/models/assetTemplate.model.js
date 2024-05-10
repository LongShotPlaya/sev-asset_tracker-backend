module.exports = (sequelize, Sequelize) => {
  return sequelize.define("assetTemplate", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(75),
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["name"],
      },
    ],
  });

  // Foreign keys:
  // - assetTypeId (non-nullable)
};