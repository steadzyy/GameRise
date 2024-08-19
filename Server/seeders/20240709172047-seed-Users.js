'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcryptjs');
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
   const salt = bcrypt.genSaltSync(10);
   let data = [{
    "username": "steadzyy",
    "email": "bayua@gmail.com",
    "password": "12345",
    "role": "Developer"   },
   {
    "username": "farel",
    "email": "farel@gmail.com",
    "password": "12345",
    "role": "Developer"
   }
  ]
  .map(el =>{
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.password = bcrypt.hashSync(el.password, salt);
      return el
  })
  await queryInterface.bulkInsert("Users", data)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {truncate: true, restartIdentity: true})
  }
};
