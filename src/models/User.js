const { DataTypes } = require('sequelize')
const db = require('../config/database')

const User = db.define("users", {
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
	address: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	phone_number: { type: DataTypes.STRING }
}, { freezeTableName: true })



module.exports = User