const express = require('express')
const verifyToken = require('../middlewares/auth')
const {
  createEnquiry,
  claimEnquiry,
  getAllEnquiries,
  getMyEnquiries,
} = require('../controllers/enquiryController')

const router = express.Router()

router.post('/create', createEnquiry)

router.post('/claim/:id', verifyToken, claimEnquiry)
router.get('/all', verifyToken, getAllEnquiries)
router.get('/mine', verifyToken, getMyEnquiries)

module.exports = router

