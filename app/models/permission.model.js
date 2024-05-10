module.exports = (sequelize, Sequelize) => {
  return sequelize.define("permission", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(75),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(125),
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