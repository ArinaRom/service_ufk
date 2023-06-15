const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Program = sequelize.define('program', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

module.exports = Program;
