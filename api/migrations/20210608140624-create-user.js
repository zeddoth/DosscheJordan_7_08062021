"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      roles: {
        defaultValue: "user",
        type: Sequelize.ENUM("admin", "user"),
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING(50),
      },
      lastName: {
        allowNull: true,
        type: Sequelize.STRING(50),
      },
      firstName: {
        allowNull: true,
        type: Sequelize.STRING(50),
      },
      job: {
        allowNull: true,
        type: Sequelize.STRING(50),
      },
      birthday: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user");
  },
};
