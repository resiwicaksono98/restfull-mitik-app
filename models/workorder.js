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
			WorkOrder.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' })
			WorkOrder.belongsTo(models.Engineer, { foreignKey: 'engineerId', as: 'engineer' })
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
		orderId: { type: DataTypes.STRING, unique: { args: true, msg: 'Maximum Create work order 1' } },
		engineerId: { type: DataTypes.STRING },
		start_date: { type: DataTypes.DATE },
		finished_date: { type: DataTypes.DATE },
		detail: { type: DataTypes.TEXT },
		status: { type: DataTypes.STRING }
	}, {
		sequelize,
		modelName: 'WorkOrder',
	});
	return WorkOrder;
};