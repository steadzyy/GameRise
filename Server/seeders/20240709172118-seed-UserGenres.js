'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = [{
      "GenreId": 1,
      "UserId": 1
     }
    ]
    .map(el =>{
        el.createdAt = new Date()
        el.updatedAt = new Date()
        return el
    })
    await queryInterface.bulkInsert("UserGenres", data)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("UserGenres", null, {truncate: true, restartIdentity: true})
  }
};
