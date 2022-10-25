const { DataTypes } = require('sequelize')
const db = require('../config/database')

const Sparepart = db.define('spare_parts', {
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
	price: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {freezeTableName: true})

module.exports = Sparepart