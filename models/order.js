'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Order.belongsTo(models.User, { foreignKey: { name: 'userId' }, as: 'user' })
			// Engineer Has Many Orders
			Order.belongsTo(models.Engineer, { foreignKey: {name: 'engineerId'}, as: 'engineer' })
		
			// ends
			Order.belongsTo(models.WorkOrder, { foreignKey: 'workOrderId', as: 'workOrder' })
			Order.belongsTo(models.Sparepart, { foreignKey: 'sparepartId', as: 'sparepart' })
			Order.hasOne(models.Invoice, { foreignKey: 'order', as: 'invoice' })
		}
	}
	Order.init({
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		userId: {
			type: DataTypes.STRING,
			allowNull: false
		},
		engineerId: { type: DataTypes.STRING },
		workOrderId: { type: DataTypes.STRING },
		order_type: { type: DataTypes.STRING, allowNull: false },
		sparepartId: { type: DataTypes.STRING },
		description: { type: DataTypes.TEXT },
		status: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'pending'
		}
	}, {
		sequelize,
		modelName: 'Order',
	});
	return Order;
};