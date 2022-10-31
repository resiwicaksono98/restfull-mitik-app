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
			orderId: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			payment_status: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: 'pending'
				// Payment Status : Pending / Complete / Cancelled / Failed
			},
			totalPrice: {
				type: Sequelize.STRING,
				allowNull: false
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