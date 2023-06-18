const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Subsystem = sequelize.define('subsystem', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: true},
    keywords: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true},
})

module.exports = Subsystem;
