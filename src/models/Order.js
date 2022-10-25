const { DataTypes } = require('sequelize')
const db = require('../config/database')
const Engineer = require('./Engineer')
const Sparepart = require('./Sparepart')
const User = require('./User')
const WorkOrder = require('./WorkOrder')

const Order = db.define("orders", {
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
	workOrderId: { type: DataTypes.STRING },
	order_type: { type: DataTypes.STRING, allowNull: false },
	sparepartId: { type: DataTypes.STRING },
	description: { type: DataTypes.TEXT },
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'pending'
	}
}, { freezeTableName: true })

// Relation Table User & Order
User.hasMany(Order, { foreignKey: { name: 'userId' }, as: 'order' })
Order.belongsTo(User, { foreignKey: { namee: 'userId' }, as: 'user' })

// Relation Table Engineer
Engineer.hasOne(Order, { foreignKey: 'engineerId', as: 'order' })
Order.hasMany(Engineer, { foreignKey: 'engineerId', as: 'engineer' })

// Relation table WorkOrder
WorkOrder.hasOne(Order, { foreignKey: 'workOrderId', as: 'order' })
Order.belongsTo(WorkOrder, { foreignKey: 'workOrderId', as: 'workOrder' })

// Relation Table Sparepart
Sparepart.hasMany(Order, { foreignKey: 'sparepartId', as: 'order' })
Order.belongsTo(Sparepart, { foreignKey: 'sparepartId', as: 'sparepart' })



module.exports = Order