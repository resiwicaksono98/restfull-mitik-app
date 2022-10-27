'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Orders', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true
			},
			userId: {
				type: Sequelize.STRING,
				allowNull: false
			},
			order_type: { type: Sequelize.STRING, allowNull: false },
			sparepartId: { type: Sequelize.STRING },
			description: { type: Sequelize.TEXT },
			status: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: 'pending'
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
		await queryInterface.dropTable('Orders');
	}
};