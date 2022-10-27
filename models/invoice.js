'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
		Invoice.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
		Invoice.belongsTo(models.Order, {foreignKey: 'order', as: 'orders'})
    }
  }
  Invoice.init({
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true
	},
	userId: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	address: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	order: {
		type: DataTypes.STRING,
		allowNull: false
	},
	payment_status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'pending'
		// Payment Status : Pending / Complete / Cancelled / Failed
	}
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};