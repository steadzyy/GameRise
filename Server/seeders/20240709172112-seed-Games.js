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
    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://epic-store-games.p.rapidapi.com/onSale',
      params: {
        searchWords: 'v',
        categories: 'All',
        locale: 'us',
        country: 'id'
      },
      headers: {
        'x-rapidapi-key': '0e6542c2edmsha5373bd1207101bp159f71jsn547e3b87205b',
        'x-rapidapi-host': 'epic-store-games.p.rapidapi.com'
      }
    };
    
    const response = await axios.request(options);
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
  }
    const data = response.data.map(el => {
      return {
        title: el.title,
        description: el.description,
        price: el.currentPrice,
        GenreId: getRandomArbitrary(1, 7).toFixed(0),
        UserId: 1,
        imageUrl: el.keyImages[0].url,
        createdAt: el.createdAt = new Date(),
        updatedAt: el.updatedAt = new Date()
      }
    })
    // console.log(data)
    await queryInterface.bulkInsert("Games", data)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Games", null, {truncate: true, restartIdentity: true})
  }
};
