const { DataTypes } = require('sequelize')
const db = require('../config/database')
const Admin = require('./Admin')

const WorkOrder = db.define("work_orders", {
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
}, { freezeTableName: true })

// Relation Admin & work order
Admin.hasOne(WorkOrder, { foreignKey: 'adminId', as: 'workOrder' })
WorkOrder.belongsTo(Admin, { foreignKey: 'adminId', as: 'admin' })

module.exports = WorkOrder