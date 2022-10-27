'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Invoices', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true
			},
			userId: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			address: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			order: {
				type: Sequelize.STRING,
				allowNull: false
			},
			payment_status: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: 'pending'
				// Payment Status : Pending / Complete / Cancelled / Failed
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
		await queryInterface.dropTable('Invoices');
	}
};