'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Admin extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Admin.hasOne(models.WorkOrder, { foreignKey: 'adminId', as: 'order' })
		}
	}
	Admin.init({
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
		phone_number: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				args: true,
				msg: 'Phone number already use'
			}
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'admin' // admin/superAdmin

		}
	}, {
		sequelize,
		modelName: 'Admin',
	});
	return Admin;
};