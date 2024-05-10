module.exports = (sequelize, Sequelize) => {
  return sequelize.define("vendor", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(85),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(50),
    },
    phoneNo: {
      type: Sequelize.STRING(30),
    }
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