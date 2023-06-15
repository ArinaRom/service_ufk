const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Application = sequelize.define('application', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		organization: {type: DataTypes.STRING, allowNull: false},
    fullName: {type: DataTypes.STRING, allowNull: false},
    departureDepartment: {type: DataTypes.STRING, allowNull: true},
		description: {type: DataTypes.STRING, allowNull: true},
		status: {
        type: DataTypes.ENUM('created', 'rejected', 'completed'),
        allowNull: false,
        defaultValue: 'created'
    }
})

module.exports = Application;
