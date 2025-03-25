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
   const data = require('../data/doctors.json').map(el => {
      // JSON.stringify(el.schedule)
      el.schedule = JSON.stringify(el.schedule)
      console.log(el.schedule);
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    console.log(data);

   await queryInterface.bulkInsert('Doctors', data, {})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Doctors', null, {})
  }
};
