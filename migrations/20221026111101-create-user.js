'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					isEmail: true
				},
				unique: {
					args: true,
					msg: 'Email already use'
				}
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false
			},
			address: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			phone_number: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: {
					args: true,
					msg: 'Phone number already use'
				}
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			 },
			 updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			 }
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Users');
	}
};