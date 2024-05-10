module.exports = (sequelize, Sequelize) => {
  return sequelize.define("alertType", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(25),
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