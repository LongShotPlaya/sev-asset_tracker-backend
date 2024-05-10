module.exports = (sequelize, Sequelize) => {
  return sequelize.define("fieldList", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(50),
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
};