"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Games", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      platform: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      maxPlayers: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      rankList: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      roleList: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING),
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Games");
  },
};
