'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class WorkOrder extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			WorkOrder.belongsTo(models.Admin, { foreignKey: 'adminId', as: 'admin' });
			WorkOrder.hasOne(models.Order, { foreignKey: 'workOrderId', as: 'order' })
		}
	}
	WorkOrder.init({
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		adminId: { type: DataTypes.STRING },
		start_date: { type: DataTypes.DATE },
		finished_date: { type: DataTypes.DATE },
		address: { type: DataTypes.TEXT },
		detail: { type: DataTypes.TEXT },
		status: { type: DataTypes.STRING }
	}, {
		sequelize,
		modelName: 'WorkOrder',
	});
	return WorkOrder;
};