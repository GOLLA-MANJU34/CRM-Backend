const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Enquiry = sequelize.define('Enquiry', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
  },
  assignedTo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
})

module.exports = Enquiry
