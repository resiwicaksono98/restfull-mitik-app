const { Sequelize } = require('sequelize')
const config = require('./config')

const db = new Sequelize(`${config.db_name}`, `${config.db_user}`, `${config.db_password}`, {
	host: config.host,
	dialect: 'mysql'
})

module.exports = db

