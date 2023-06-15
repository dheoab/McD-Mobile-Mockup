"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const ingredientsData = require("../datas/Ingredients.json").map(
      (ingredient) => {
        ingredient.createdAt = ingredient.updatedAt = new Date();
        return ingredient;
      }
    );
    await queryInterface.bulkInsert("Ingredients", ingredientsData, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Ingredients", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
