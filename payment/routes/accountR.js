const express = require('express')
const accountC = require('../controllers/accountC.js')

const router = express.Router()

router.post('/', accountC.createAccount)

module.exports = router