const express = require('express')
const categoryC = require('../controllers/categoryC.js')
const passport = require('passport')
const checkBlackList = require('../middlewares/jwtBlackList.js')

const router = express.Router()

router.get('/', categoryC.all)

// protected routes
router.post('/', passport.authenticate('jwt', { session: false }), checkBlackList, categoryC.create)
router.patch('/:id', passport.authenticate('jwt', { session: false }), checkBlackList, categoryC.update)
router.delete('/:id', passport.authenticate('jwt', { session: false }), checkBlackList, categoryC.delete)
module.exports = router