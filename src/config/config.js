const dotenv = require('dotenv').config()

module.exports = {
	service_name: process.env.SERVICE_NAME,
	base_url: process.env.BASE_URL,
	host: process.env.HOST,
	secret_key: process.env.SECRET_KEY,
	db_user: process.env.DB_USER,
	db_password: process.env.DB_PASSWORD,
	db_name: process.env.DB_NAME,
}
