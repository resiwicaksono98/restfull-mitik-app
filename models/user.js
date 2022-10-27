'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.hasMany(models.Order, { foreignKey: { name: 'userId' }, as: 'order' })
			User.hasMany(models.Invoice, { foreignKey: 'userId', as: 'invoice' })
		}
	}
	User.init({
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
			allowNull: false,
			validate: {
				isEmail: true
			},
			unique: {
				args: true,
				msg: 'Email already use'
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		address: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		phone_number: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				args: true,
				msg: 'Phone number already use'
			}
		}
	}, {
		sequelize,
		modelName: 'User',
	});
	return User;
};