const express = require('express')
const authR = require('./authR.js')
const categoriesR = require('./categoriesR.js')
const productsR = require('./productsR.js')

const router = express.Router()

router.use('/auth', authR)
router.use('/categories', categoriesR)
router.use('/products', productsR)

module.exports = router