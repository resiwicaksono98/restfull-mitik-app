'use strict';
const { v4: uuid } = require('uuid')
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Admins', [{
			id: uuid(),
			name: 'Resi Wicaksono',
			email: 'resi@gmail.com',
			password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
			phone_number: '081311290187',
			role: 'superAdmin',
			createdAt: new Date(),
			updatedAt: new Date()
		}], {});

	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Adminss', null, {});
	}
};
