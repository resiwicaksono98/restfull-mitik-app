const { DataTypes } = require('sequelize')
const db = require('../config/database')
const Order = require('./Order')
const User = require('./User')

const Invoice = db.define('invoices', {
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
}, { freezeTableName: true })

// Relation to User
User.hasMany(Invoice, { foreignKey: 'userId', as: 'invoice' })
Invoice.belongsTo(User, { foreignKey: 'userId', as: 'user' })

// Relation to order
Order.hasOne(Invoice, { foreignKey: 'order', as: 'invoice' })
Invoice.belongsTo(Order, {foreignKey: 'order', as: 'orders'})

module.exports = Invoice