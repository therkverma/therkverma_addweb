import Sequelize from 'sequelize';
import UserModel from '../models/users';;

const config = require('../config/config.json');
const { database, username, password, host, dialect } = config;

const sequelizeInstance = new Sequelize(database, username, password, {
    host,
    dialect,
    define: {
        freezeTableName: true,
        timestamps: false
    },
    dialectOptions: { decimalNumbers: true } // Otherwise Sequelize return string for float values
});

sequelizeInstance.sync()

const User = UserModel(sequelizeInstance, Sequelize);

module.exports = {
    User
}