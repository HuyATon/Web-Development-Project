const express = require('express')
const authR = require('./authR.js')
const categoriesR = require('./categoriesR.js')
const productsR = require('./productsR.js')
const ordersR = require('./ordersR.js')
const uploadR = require('./uploadR.js')
const statisticR = require('./statisticR.js')

const router = express.Router()

router.use('/auth', authR)
router.use('/categories', categoriesR)
router.use('/products', productsR)
router.use('/orders', ordersR)
router.use('/upload-image',uploadR )
router.use('/statistic', statisticR)


module.exports = router