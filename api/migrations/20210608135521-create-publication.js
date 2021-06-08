"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("publication", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      attachment: {
        allowNull: true,
        type: Sequelize.STRING(120),
      },
      like: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      dislike: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      authorID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
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
    await queryInterface.dropTable("publication");
  },
};
