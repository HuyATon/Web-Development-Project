const express = require('express')
const paymentC = require('../controllers/paymentC.js')

const router = express.Router()

router.post('/', paymentC.handlePayment)

module.exports = router