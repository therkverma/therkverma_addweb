'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true,
      },
      father_name: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true
        }
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },
      address: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      dob: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      photos: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      deleted_at: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DATE
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },

  down: (queryInterface) => queryInterface.dropTable('users')
};