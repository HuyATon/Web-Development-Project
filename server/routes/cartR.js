const express = require('express')
const router = express.Router()
const cartC = require('../controllers/cartC.js')

router.get('/', cartC.getUserCart)
router.post('/', cartC.create)
router.patch('/', cartC.update)

module.exports = router