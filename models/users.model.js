module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      email:{
        type: Sequelize.STRING(50),
        allowNull: false
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    });
  return Users;
};
