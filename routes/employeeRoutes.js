const express = require('express')
const { register, login } = require('../controllers/employeeController')
const verifyToken = require('../middlewares/auth')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: `Welcome employee ${req.userId}` })
})

module.exports = router
