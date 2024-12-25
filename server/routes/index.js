const express = require('express')
const authR = require('./authR.js')
const categoriesR = require('./categoriesR.js')

const router = express.Router()

router.use('/auth', authR)
router.use('/categories', categoriesR)


module.exports = router