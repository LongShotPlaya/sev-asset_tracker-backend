module.exports = (sequelize, Sequelize) => {
    return sequelize.define("person", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      lName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });
};