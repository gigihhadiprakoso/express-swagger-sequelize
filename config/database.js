require('dotenv').config()

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_CONNECTION,
  operatorsAliases: 0,
  define:{
    timestamps: false
  }
});


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.excludeSelect = ['updated_by', 'created_by', 'created_date', 'is_deleted'];

db.events = require("../models/events.model.js")(sequelize, DataTypes);
db.users = require("../models/users.model.js")(sequelize, DataTypes);

module.exports = db;