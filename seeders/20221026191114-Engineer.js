'use strict';
const { v4: uuid } = require('uuid')
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Engineers', [{
			id: uuid(),
			name: 'Jonny Iskandar',
			email: 'jon@gmail.com',
			password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
			phone_number: '0812928328',
			createdAt: new Date(),
			updatedAt: new Date()
		}], {});

	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Engineers', null, {});
	}
};
