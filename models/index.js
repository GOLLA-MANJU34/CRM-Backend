const sequelize = require('../config/database')
const Employee = require('./employee')
const Enquiry = require('./enquiry')


Employee.hasMany(Enquiry, { foreignKey: 'assignedTo' })
Enquiry.belongsTo(Employee, { foreignKey: 'assignedTo' })

const syncDB = async () => {
  await sequelize.sync({ alter: true })
  console.log('Database synchronized successfully')
}

module.exports = { sequelize, Employee, Enquiry, syncDB }
