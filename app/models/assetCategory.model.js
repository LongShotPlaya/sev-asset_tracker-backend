module.exports = (sequelize, Sequelize) => {
  return sequelize.define("assetCategory", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
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
};