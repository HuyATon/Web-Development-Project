const express = require('express')
const paymentR = require('./paymentR.js')
const accountR = require('./accountR.js')
const checkAuthenticate = require('../mws/checkAuthenticate.js')


const router = express.Router()

router.use('/payment', checkAuthenticate, paymentR)
router.use('/account', accountR)

module.exports = router