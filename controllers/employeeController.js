const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Employee } = require('../models')
require('dotenv').config()


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await Employee.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }


    const hashedPassword = await bcrypt.hash(password, 10)


    const newEmployee = await Employee.create({
      name,
      email,
      password: hashedPassword,
    })

    res.status(201).json({
      message: 'Employee registered successfully',
      employee: { id: newEmployee.id, name: newEmployee.name, email: newEmployee.email },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error during registration' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const employee = await Employee.findOne({ where: { email } })
    if (!employee) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const isPasswordValid = await bcrypt.compare(password, employee.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign({ id: employee.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.status(200).json({
      message: 'Login successful',
      token,
      employee: { id: employee.id, name: employee.name, email: employee.email },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error during login' })
  }
}

module.exports = { register, login }
