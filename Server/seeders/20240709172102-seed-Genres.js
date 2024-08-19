"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let data = [
      {
        name: "First Person Shooter",
      },
      {
        name: "Actions",
      },
      {
        name: "Sports",
      },
      {
        name: "Third Person Player",
      },
      {
        name: "Race",
      },
      {
        name: "Battle Royal",
      },
      {
        name: "RPG",
      },
    ].map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Genres", data);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Genres", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
