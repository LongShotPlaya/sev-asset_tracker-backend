module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define("session", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: Sequelize.STRING(3000),
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    expirationDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  // {
  //   indexes: [
  //     {
  //       unique: true,
  //       fields: ["token"],
  //     },
  //   ],
  // }
  );

  return Session;
};
