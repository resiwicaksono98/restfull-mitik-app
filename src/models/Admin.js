const { DataTypes } = require('sequelize')
const db = require('../config/database')

const Admin = db.define('admins', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	phone_number: { type: DataTypes.STRING }
}, { freezeTableName: true })

module.exports = Admin