'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('WorkOrders', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true
			},
			adminId: { type: Sequelize.STRING },
			start_date: { type: Sequelize.DATE },
			finished_date: { type: Sequelize.DATE },
			address: { type: Sequelize.TEXT },
			detail: { type: Sequelize.TEXT },
			status: { type: Sequelize.STRING },
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
		await queryInterface.dropTable('WorkOrders');
	}
};